import { getItem, setItem } from './storage';

const KEY = 'mb_auth_v1';
const ALLOWLIST = ['admin@mbadmin.local'];

export interface AuthSession { email: string; isAdmin: boolean; }

export function getSession(): AuthSession | null {
  const session = getItem<AuthSession | null>(KEY, null);
  return session;
}

export function login(email: string, _password: string): AuthSession {
  const isAdmin = email.endsWith('@mbadmin.local') || ALLOWLIST.includes(email);
  const session: AuthSession = { email, isAdmin };
  setItem(KEY, session);
  return session;
}

export function logout(): void { setItem<AuthSession | null>(KEY, null); }

export function isAdmin(): boolean { return Boolean(getSession()?.isAdmin); }
