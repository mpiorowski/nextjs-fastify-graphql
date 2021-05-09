import { REST } from "./@enums";

interface Options {
  url: string;
  method: REST;
  body?: string;
}
export const apiRequest = async <T>(options: Options): Promise<T> => {
  const response = await fetch(options.url, options);
  if (!response.ok) {
    return await Promise.reject('Api: Something went wrong');
  }
  if (response.status === 204) {
    return {} as T;
  }
  return await response.json() as T;
};
