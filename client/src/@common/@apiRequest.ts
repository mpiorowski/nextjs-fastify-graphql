import { handleError } from "./@handleError";

interface Options {
  url: string;
  method: "POST" | "GET" | "PUT" | "PATCH";
  body?: string;
}
export const apiRequest = async <T>(options: Options): Promise<T> => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const defaults = { headers };
  options = { ...defaults, ...options };
  const response = await fetch(`/api${options.url}`, options);
  if (!response.ok) {
    const data = await response.json();
    handleError(data.errors);
    return;
  }
  if (response.status === 204) {
    return {} as T;
  }
  return (await response.json()) as T;
};
