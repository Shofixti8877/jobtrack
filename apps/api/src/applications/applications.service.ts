import { Injectable } from '@nestjs/common';
import type { Application } from './application.js';

@Injectable()
export class ApplicationsService {
  private readonly applications: Application[] = [
    {
      id: '1',
      company: 'Acme',
      position: 'Senior Full Stack Developer',
      status: 'technical',
      appliedAt: '2026-10-20',
      location: 'Tel Aviv',
      source: 'LinkedIn',
    },
    {
      id: '2',
      company: 'Globex',
      position: 'Frontend Engineer',
      status: 'screening',
      appliedAt: '2026-10-22',
      location: 'Herzliya',
      source: 'Company website',
    },
  ];

  findAll(): Application[] {
    return this.applications;
  }
}
