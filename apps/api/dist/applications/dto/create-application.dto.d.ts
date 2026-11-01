declare const APPLICATION_STATUSES: readonly ["applied", "screening", "technical", "final", "offer", "rejected"];
export declare class CreateApplicationDto {
    company: string;
    position: string;
    status: (typeof APPLICATION_STATUSES)[number];
    location?: string;
    jobUrl?: string;
    source?: string;
    notes?: string;
}
export {};
