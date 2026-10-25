export type ApplicationStatus = 'applied' | 'screening' | 'technical' | 'final' | 'offer' | 'rejected';
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
