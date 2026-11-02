import { useEffect, useState, type ReactNode } from 'react';

import {
  createApplication,
  deleteApplication as deleteApplicationApi,
  getApplications,
  updateApplication as updateApplicationApi,
} from '../api/applicationsApi';

import type {
  Application,
  ApplicationInput,
  ApplicationStatus,
} from '../types/application';

import { ApplicationsContext } from './applications-context';

type ApplicationsProviderProps = {
  children: ReactNode;
};

export function ApplicationsProvider({ children }: ApplicationsProviderProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadApplications() {
      try {
        setIsLoading(true);
        setError(null);

        const loadedApplications = await getApplications(controller.signal);

        setApplications(loadedApplications);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load applications',
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadApplications();

    return () => {
      controller.abort();
    };
  }, []);

  async function addApplication(applicationInput: ApplicationInput) {
    const createdApplication = await createApplication(applicationInput);

    setApplications((currentApplications) => [
      ...currentApplications,
      createdApplication,
    ]);
  }

  async function deleteApplication(id: string) {
    await deleteApplicationApi(id);

    setApplications((currentApplications) =>
      currentApplications.filter((application) => application.id !== id),
    );
  }

  async function updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
  ) {
    const updatedApplication = await updateApplicationApi(id, { status });

    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === id ? updatedApplication : application,
      ),
    );
  }

  async function updateApplication(
    id: string,
    applicationInput: ApplicationInput,
  ) {
    const updatedApplication = await updateApplicationApi(id, applicationInput);

    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === id ? updatedApplication : application,
      ),
    );
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        isLoading,
        error,
        addApplication,
        deleteApplication,
        updateApplicationStatus,
        updateApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}
