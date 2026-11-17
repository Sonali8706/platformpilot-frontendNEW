
const BASE = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:4000" : "")
).trim().replace(/\/+$/, "");

export async function request(path, options = {}) {
  if (!BASE) {
    throw new Error(
      "Backend URL is missing. Set VITE_API_URL in Vercel and redeploy."
    );
  }

  const token = localStorage.getItem("pp_token");

  let response;

  try {
    response = await fetch(`${BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch (error) {
    console.error("API connection failed:", {
      url: `${BASE}${path}`,
      error: error.message,
    });

    throw new Error(
      `Could not connect to ${BASE}. Check the API URL, Render service and CORS settings.`
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed (${response.status})`
    );
  }

  return data;
}

export const api = {
  login: (body) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  signup: (body) =>
    request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  me: () => request("/api/me"),

  trips: () => request("/api/trips"),

  vehicles: () => request("/api/vehicles"),

  platforms: () => request("/api/platforms"),

  recommendations: () => request("/api/recommendations"),

  goals: () => request("/api/goals/status"),

  admin: () => request("/api/admin/stats"),

  addTrip: (body) =>
    request("/api/trips", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  addVehicle: (body) =>
    request("/api/vehicles", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  setGoal: (body) =>
    request("/api/goals", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
