export const requestHandler = async <T>({
  url,
  method,
  headers,
  body,
}: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: Record<string, string> | string;
}): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
  const data = (await response.json()) as T & { error: string };
  if (!response.ok) {
    throw new Error(
      data.error
        ? `Error: ${data.error} status: ${response.statusText}`
        : 'Failed to refresh token'
    );
  }
  return data;
};
