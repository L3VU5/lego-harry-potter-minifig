import { useQuery } from "@tanstack/react-query";

import type { MinifigsResponse, PartsResponse } from "../types";

const BASE_URL = "https://rebrickable.com/api/v3/lego";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function get<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  // EXPO_PUBLIC_ variables are inlined into the app bundle, so this key is not a secret.
  // Rebrickable keys are free; use your own and rotate it if it ever leaks.
  const key = process.env.EXPO_PUBLIC_REBRICKABLE_KEY;
  if (!key) {
    throw new ApiError(
      "The Rebrickable API key is missing. Copy .env.example to .env and set EXPO_PUBLIC_REBRICKABLE_KEY."
    );
  }

  const query = Object.entries({ key, ...params })
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join("&");

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}?${query}`);
  } catch {
    throw new ApiError("Could not reach Rebrickable. Check your connection and try again.");
  }

  if (!response.ok) {
    throw new ApiError(
      response.status === 401
        ? "Rebrickable rejected the API key."
        : `Rebrickable answered with an error (${response.status}).`
    );
  }
  return (await response.json()) as T;
}

export const fetchMinifigs = () =>
  get<MinifigsResponse>("/minifigs/", { search: "harry potter", page_size: "500" });

export const fetchMinifigParts = (setNum: string) =>
  get<PartsResponse>(`/minifigs/${encodeURIComponent(setNum)}/parts/`);

const ONE_HOUR = 60 * 60 * 1000;

export const useMinifigs = () =>
  useQuery({ queryKey: ["minifigs"], queryFn: fetchMinifigs, staleTime: ONE_HOUR });

// The set number is part of the key, otherwise the parts of the previously chosen figure show up.
export const useMinifigParts = (setNum: string) =>
  useQuery({
    queryKey: ["minifig-parts", setNum],
    queryFn: () => fetchMinifigParts(setNum),
    staleTime: ONE_HOUR,
  });
