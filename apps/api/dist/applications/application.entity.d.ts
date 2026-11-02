import type { ApplicationStatus } from './application.js';
export declare class ApplicationEntity {
    id: string;
    company: string;
    position: string;
    status: ApplicationStatus;
    appliedAt: string;
    location?: string;
    jobUrl?: string;
    source?: string;
    notes?: string;
}
