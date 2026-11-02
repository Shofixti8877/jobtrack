import type { Application, ApplicationInput } from '../types/application';

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

export async function createApplication(
  application: ApplicationInput,
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error(`Failed to create application: ${response.status}`);
  }

  return response.json();
}

export async function updateApplication(
  id: string,
  application: Partial<ApplicationInput>,
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error(`Failed to update application: ${response.status}`);
  }

  return response.json();
}

export async function deleteApplication(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete application: ${response.status}`);
  }
}
