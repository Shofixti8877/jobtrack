import type { APPLICATION_STATUSES } from "../constants/applicationStatus";

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]["value"];

export type Application = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  appliedAt: string;

  location?: string;
  jobUrl?: string;
  source?: string;
  notes?: string;
};
