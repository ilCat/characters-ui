import { API_BASE } from './utils';

// Shared promise for pending refresh request (prevents duplicate refresh calls)
let refreshPromise: Promise<boolean> | null = null;

async function executeTokenRefresh(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        return res.ok;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

/**
 * Custom fetch wrapper that intercepts 401 Unauthorized responses,
 * attempts a single shared token refresh, and retries the original request.
 */
export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const fetchOptions: RequestInit = {
    ...options,
    credentials: 'include',
  };

  const response = await fetch(url, fetchOptions);

  // Intercept 401 Unauthorized responses (excluding login and refresh endpoints themselves)
  if (response.status === 401 && !url.includes('/api/auth/login') && !url.includes('/api/auth/refresh')) {
    const refreshedOk = await executeTokenRefresh();

    if (refreshedOk) {
      // Retry the original request with newly refreshed HttpOnly cookies
      return fetch(url, fetchOptions);
    } else {
      // Refresh token expired or invalid: prompt user to log in again
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
  }

  return response;
}
