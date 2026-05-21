import { apiClient } from '@/lib/api/client';
import { appConfig } from '@/lib/config';
import { mockPlans, mockSubscribe, mockUser } from '@/lib/api/mock';
import type {
  ApiEnvelope,
  AppApiEnvelope,
  AppSessionOverlay,
  AppSessionPayload,
  Plan,
  SessionSnapshot,
  SubscribeInfo,
  UserInfo,
} from '@/lib/api/types';

type RawSubscribeInfo = Omit<SubscribeInfo, 'plan'> & {
  plan?: string | { name?: string | null } | null
}

function normalizeUserInfo(user: UserInfo): UserInfo {
  return user
}

function normalizeSubscribeInfo(subscribe: RawSubscribeInfo): SubscribeInfo {
  return {
    ...subscribe,
    plan: typeof subscribe.plan === 'string'
      ? subscribe.plan
      : subscribe.plan?.name ?? null,
  }
}

function extractSafeAppSessionOverlay(session: AppSessionPayload): AppSessionOverlay {
  return {
    user: {
      email: session.user?.email,
      avatar_url: session.user?.avatar_url,
    },
    subscription: {
      expired_at: session.subscription?.expired_at,
    },
    traffic: {
      total: session.traffic?.total,
      download: session.traffic?.download,
    },
    preferences: {
      remind_expire: session.preferences?.remind_expire,
      remind_traffic: session.preferences?.remind_traffic,
    },
  }
}

function applySafeAppSessionOverlay(
  snapshot: SessionSnapshot,
  overlay: AppSessionOverlay | null,
): SessionSnapshot {
  if (!overlay) return snapshot

  return {
    user: {
      ...snapshot.user,
      avatar_url: snapshot.user.avatar_url ?? overlay.user.avatar_url,
      expired_at: snapshot.user.expired_at ?? overlay.subscription.expired_at,
      transfer_enable: snapshot.user.transfer_enable ?? overlay.traffic.total,
      d: snapshot.user.d ?? overlay.traffic.download,
      remind_expire: snapshot.user.remind_expire ?? overlay.preferences.remind_expire,
      remind_traffic: snapshot.user.remind_traffic ?? overlay.preferences.remind_traffic,
    },
    subscribe: {
      ...snapshot.subscribe,
      transfer_enable: snapshot.subscribe.transfer_enable ?? overlay.traffic.total,
      d: snapshot.subscribe.d ?? overlay.traffic.download,
      expired_at: snapshot.subscribe.expired_at ?? overlay.subscription.expired_at,
    },
  }
}

async function getAppSessionOverlay(): Promise<AppSessionOverlay | null> {
  // The App BFF session is an optional probe. Any failure must preserve the
  // legacy user/info + getSubscribe hydrate path rather than blocking login.
  try {
    const response = await apiClient.get<AppApiEnvelope<AppSessionPayload>>('/api/app/v1/session');
    if (response.data.ok !== true || !response.data.data) return null
    return extractSafeAppSessionOverlay(response.data.data)
  } catch {
    return null
  }
}

export async function getUserInfo() {
  if (appConfig.enableMock) return mockUser;
  const response = await apiClient.get<ApiEnvelope<UserInfo>>('/api/v1/user/info');
  return normalizeUserInfo(response.data.data);
}

export async function getSubscribeInfo() {
  if (appConfig.enableMock) return mockSubscribe;
  const response = await apiClient.get<ApiEnvelope<RawSubscribeInfo>>('/api/v1/user/getSubscribe');
  return normalizeSubscribeInfo(response.data.data);
}

export async function hydrateUserSession(): Promise<SessionSnapshot> {
  if (appConfig.enableMock) {
    return {
      user: mockUser,
      subscribe: mockSubscribe,
    }
  }

  const appSessionOverlayPromise = appConfig.enableAppBff
    ? getAppSessionOverlay()
    : Promise.resolve(null)

  const [user, subscribe, appSessionOverlay] = await Promise.all([
    getUserInfo(),
    getSubscribeInfo(),
    appSessionOverlayPromise,
  ])

  return applySafeAppSessionOverlay({ user, subscribe }, appSessionOverlay)
}

export async function getPlans() {
  if (appConfig.enableMock) return mockPlans;
  const response = await apiClient.get<ApiEnvelope<Plan[]>>('/api/v1/user/plan/fetch');
  return response.data.data;
}
