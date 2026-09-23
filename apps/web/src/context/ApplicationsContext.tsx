/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import { applications as initialApplications } from '../data/applications';
import type {
  Application,
  ApplicationStatus,
} from '../types/application';

type ApplicationsContextValue = {
  applications: Application[];
  addApplication: (application: Application) => void;
  deleteApplication: (id: string) => void;
  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus,
  ) => void;
};

const ApplicationsContext =
  createContext<ApplicationsContextValue | undefined>(undefined);

type ApplicationsProviderProps = {
  children: ReactNode;
};

export function ApplicationsProvider({
  children,
}: ApplicationsProviderProps) {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  function addApplication(application: Application) {
    setApplications((currentApplications) => [
      ...currentApplications,
      application,
    ]);
  }

  function deleteApplication(id: string) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== id,
      ),
    );
  }

  function updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
  ) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === id
          ? { ...application, status }
          : application,
      ),
    );
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        addApplication,
        deleteApplication,
        updateApplicationStatus,
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