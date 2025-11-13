// frontend/src/services/api.ts

// Use environment variable for backend URL (works locally and in production)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Example API functions
export const api = {
  // Get the welcome message
  getWelcomeMessage: () => fetchFromAPI('/'),

  // Add more API functions here as needed
  // createItem: (data: ItemData) =>
  //   fetchFromAPI('/items', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   }),
};
