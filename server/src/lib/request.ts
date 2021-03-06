import fetch from "node-fetch";

export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as T;
  return data;
};
