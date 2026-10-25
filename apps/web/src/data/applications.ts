import type { Application } from "../types/application";

export const applications: Application[] = [
  {
    id: "1",
    company: "Acme",
    position: "Senior Full Stack Developer",
    status: "technical",
    appliedAt: "2026-09-15",
    location: "Tel Aviv",
    source: "LinkedIn",
    jobUrl: "https://example.com/jobs/1",
    notes: "Technical interview scheduled for next week.",
  },
  {
    id: "2",
    company: "Globex",
    position: "Senior Frontend Engineer",
    status: "screening",
    appliedAt: "2026-09-18",
  },
  {
    id: "3",
    company: "Initech",
    position: "Full Stack Engineer",
    status: "applied",
    appliedAt: "2026-09-21",
  },
];
