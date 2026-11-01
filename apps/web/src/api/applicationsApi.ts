import type { Application } from '../types/application';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function getApplications(
  signal?: AbortSignal,
): Promise<Application[]> {
  const response = await fetch(`${API_URL}/applications`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch applications: ${response.status}`);
  }

  return response.json();
}
