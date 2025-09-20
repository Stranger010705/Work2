import { getAccessToken } from "./auth";

const BASE_URL = "https://9f82db3e6f56.ngrok-free.app";

// Create palette
export async function createPalette(colors) {
  const token = getAccessToken();
  const res = await fetch(`${BASE_URL}/palettes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ colors }),
  });

  if (!res.ok) {
    throw new Error("Failed to create palette");
  }

  return res.json();
}

// List palettes
export async function listPalettes() {
  const token = getAccessToken();
  const res = await fetch(`${BASE_URL}/palettes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch palettes");
  }

  return res.json();
}
