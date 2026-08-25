export async function readJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { error: text.slice(0, 200) || "Invalid response" };
  }
}

export async function postJson(url: string, body: unknown, init: RequestInit = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    body: JSON.stringify(body),
    credentials: "include",
    ...init,
  });
  const payload = await readJson(response);
  return { response, payload };
}
