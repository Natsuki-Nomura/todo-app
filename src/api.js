const API_URL = "http://localhost:8080";

export async function apiFetch(url, options = {}) {
  let method = "GET";

  if (options.method) {
    method = options.method.toUpperCase();
  }
  const headers = new Headers(options.headers);

  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    const response = await fetch(API_URL + "/api/csrf", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("ログインしてから操作してください");
    }

    if (response.redirected) {
      throw new Error("ログインしてから操作してください");
    }

    const csrf = await response.json();
    headers.set(csrf.headerName, csrf.token);
  }

  return fetch(url, {
    ...options,
    method,
    headers,
    credentials: "include",
  });
}
