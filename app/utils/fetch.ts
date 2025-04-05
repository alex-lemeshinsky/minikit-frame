export async function customFetch(url: string, options: RequestInit = {}) {
  const isNgrok = url.includes('ngrok');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(isNgrok ? { 'ngrok-skip-browser-warning': 'true' } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  return response;
} 