import { createContext } from 'react';

import type {
  Application,
  ApplicationInput,
  ApplicationStatus,
} from '../types/application';

export type ApplicationsContextValue = {
  applications: Application[];
  isLoading: boolean;
  error: string | null;

  addApplication: (application: ApplicationInput) => Promise<void>;

  deleteApplication: (id: string) => Promise<void>;

  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus,
  ) => Promise<void>;

  updateApplication: (
    id: string,
    application: ApplicationInput,
  ) => Promise<void>;
};

export const ApplicationsContext = createContext<
  ApplicationsContextValue | undefined
>(undefined);
