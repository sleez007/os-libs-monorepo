export const requestHelper = async <T>({
  body,
  url,
  method,
  headers,
  format = 'json',
}: {
  url: string;
  format?: 'json' | 'text';
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: URLSearchParams | string | FormData;
}): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  let errorMessage = `Request failed with status ${response.status}`;

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    try {
      if (contentType?.includes('application/json')) {
        const errorBody = (await response.json()) as { message: string };
        errorMessage = errorBody?.message || JSON.stringify(errorBody);
      } else {
        errorMessage = await response.text();
      }
    } catch (err) {
      // fallback to status text if parsing fails
      errorMessage =
        response.statusText || errorMessage || (err as Error)?.message;
    }
    throw new Error(errorMessage);
  }
  if (format === 'text') {
    return (await response.text()) as T;
  } else {
    return (await response.json()) as T;
  }
};
