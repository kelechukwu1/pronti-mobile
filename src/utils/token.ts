import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Mock auth-token persistence.
 * The token is cached in memory so `getToken()` stays synchronous, with async writes/reads persisting across launches.
 */
const ACCESS_TOKEN_KEY = "@pronti/access-token";

let cachedAccessToken: string | null = null;

/** Load the persisted token into memory. Call once on app boot. */
export async function hydrateToken(): Promise<void> {
  try {
    cachedAccessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    cachedAccessToken = null;
  }
}

export async function setToken(token: string): Promise<void> {
  cachedAccessToken = token;
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // Persistence is best-effort for the mock flow; in-memory value still holds.
  }
}

export async function clearToken(): Promise<void> {
  cachedAccessToken = null;
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // no-op
  }
}

/** Synchronous read of the cached token — used by the Apollo auth link. */
export function getToken(): string | null {
  return cachedAccessToken;
}
