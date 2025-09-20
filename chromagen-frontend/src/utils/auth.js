const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

// Save tokens
export function saveToken(access, refresh) {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

// Get tokens
export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

// Remove tokens
export function logoutUser() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// Check if logged in
export function isLoggedIn() {
  return !!getAccessToken();
}

// API call: login
export async function loginUser(username, password) {
  const res = await fetch("https://9f82db3e6f56.ngrok-free.app/users/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json(); // { access, refresh }
}
