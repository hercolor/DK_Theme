import { apiClient } from '@/lib/api/client'
import { appConfig } from '@/lib/config'
import type {
  AppApiEnvelope,
  AppDashboardOverlay,
  AppDashboardPayload,
} from '@/lib/api/types'

function extractSafeAppDashboardOverlay(dashboard: AppDashboardPayload): AppDashboardOverlay {
  return {
    user: {
      email: dashboard.session_summary?.user?.email,
      avatar_url: dashboard.session_summary?.user?.avatar_url,
    },
    subscription: {
      expired_at: dashboard.subscription_summary?.expired_at,
      next_reset_at: dashboard.subscription_summary?.next_reset_at,
    },
    traffic: {
      upload: dashboard.traffic_summary?.upload,
      download: dashboard.traffic_summary?.download,
      used: dashboard.traffic_summary?.used,
      total: dashboard.traffic_summary?.total,
      remaining: dashboard.traffic_summary?.remaining,
      usage_percent: dashboard.traffic_summary?.usage_percent,
    },
    orders: {
      unpaid_count: dashboard.orders_summary?.unpaid_count,
      pending_count: dashboard.orders_summary?.pending_count,
    },
    tickets: {
      open_count: dashboard.tickets_summary?.open_count,
    },
    notices: dashboard.notices ?? [],
  }
}

export async function getAppDashboardOverlay(): Promise<AppDashboardOverlay | null> {
  if (!appConfig.enableAppBff || appConfig.enableMock) return null

  // Dashboard BFF is an additive read-model probe. Any failure must keep the
  // legacy dashboard render path alive because /api/v1 user + traffic APIs are
  // still the source of compatibility for DK_Theme and app clients.
  try {
    const response = await apiClient.get<AppApiEnvelope<AppDashboardPayload>>('/api/app/v1/dashboard')
    if (response.data.ok !== true || !response.data.data) return null
    return extractSafeAppDashboardOverlay(response.data.data)
  } catch {
    return null
  }
}
