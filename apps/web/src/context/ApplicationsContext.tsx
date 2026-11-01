/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Application, ApplicationStatus } from '../types/application';
import { getApplications } from '../api/applicationsApi';

type ApplicationsContextValue = {
  applications: Application[];
  isLoading: boolean;
  error: string | null;

  addApplication: (application: Application) => void;
  deleteApplication: (id: string) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  updateApplication: (application: Application) => void;
};

const ApplicationsContext = createContext<ApplicationsContextValue | undefined>(
  undefined,
);

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

  function addApplication(application: Application) {
    setApplications((currentApplications) => [
      ...currentApplications,
      application,
    ]);
  }

  function deleteApplication(id: string) {
    setApplications((currentApplications) =>
      currentApplications.filter((application) => application.id !== id),
    );
  }

  function updateApplicationStatus(id: string, status: ApplicationStatus) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === id ? { ...application, status } : application,
      ),
    );
  }

  function updateApplication(updatedApplication: Application) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application,
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

export function useApplications() {
  const context = useContext(ApplicationsContext);

  if (!context) {
    throw new Error(
      'useApplications must be used within an ApplicationsProvider',
    );
  }

  return context;
}
