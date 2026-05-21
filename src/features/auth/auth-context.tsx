import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { SubscribeInfo, UserInfo } from '@/lib/api/types';
import {
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  type LoginInput,
  type RegisterInput,
} from '@/lib/api/services/auth';
import { hydrateUserSession } from '@/lib/api/services/user';
import { AUTH_STATE_EVENT, tokenStorage } from '@/lib/storage';

type AuthContextValue = {
  token: string | null;
  user: UserInfo | null;
  subscribe: SubscribeInfo | null;
  hydrated: boolean;
  login: (values: LoginInput) => Promise<void>;
  register: (values: RegisterInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(tokenStorage.get());
  const [user, setUser] = useState<UserInfo | null>(null);
  const [subscribe, setSubscribe] = useState<SubscribeInfo | null>(null);
  const [hydrated, setHydrated] = useState(false);

  async function syncSessionFromStorage() {
    const currentToken = tokenStorage.get();
    if (!currentToken) {
      setToken(null);
      setUser(null);
      setSubscribe(null);
      return;
    }

    const { user: nextUser, subscribe: nextSubscribe } = await hydrateUserSession();
    setToken(currentToken);
    setUser(nextUser);
    setSubscribe(nextSubscribe);
  }

  useEffect(() => {
    async function hydrate() {
      try {
        await syncSessionFromStorage();
      } finally {
        setHydrated(true);
      }
    }

    void hydrate();
  }, []);

  useEffect(() => {
    const handleAuthStateChange = () => {
      const currentToken = tokenStorage.get();
      if (!currentToken) {
        setToken(null);
        setUser(null);
        setSubscribe(null);
      }
    };

    window.addEventListener('storage', handleAuthStateChange);
    window.addEventListener(AUTH_STATE_EVENT, handleAuthStateChange);

    return () => {
      window.removeEventListener('storage', handleAuthStateChange);
      window.removeEventListener(AUTH_STATE_EVENT, handleAuthStateChange);
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    token,
    user,
    subscribe,
    hydrated,
    async login(values) {
      await loginRequest(values);
      await syncSessionFromStorage();
    },
    async register(values) {
      await registerRequest(values);
      await syncSessionFromStorage();
    },
    logout() {
      void logoutRequest();
      setToken(null);
      setUser(null);
      setSubscribe(null);
      setHydrated(true);
      toast.success('已退出登录');
    },
  }), [hydrated, subscribe, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// AuthContext intentionally colocates the provider and hook to preserve the existing public import path.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
