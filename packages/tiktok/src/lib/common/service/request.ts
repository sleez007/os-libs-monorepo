/**
 * @description A wrapper for all requests made to TikTok API
 * @param param0 {url: string, method: string, headers: Record<string, string>, body?: string | URLSearchParams | Buffer}
 * @returns {Promise<T>} Promise<T> return data type
 */
export const requestHandler = async <T>({
  url,
  method,
  headers,
  body,
}: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string | URLSearchParams | Buffer;
}): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  console.log(response.status);
  const data = (await response.json()) as T & { error: { message: string } };
  if (!response.ok) {
    throw new Error(
      data.error
        ? `Error: ${data.error?.message} status: ${response.statusText}`
        : 'Failed to refresh token'
    );
  }
  return data;
};
