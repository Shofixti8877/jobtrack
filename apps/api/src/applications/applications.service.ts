import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Application } from './application.js';
import type { CreateApplicationDto } from './dto/create-application.dto.js';
import type { UpdateApplicationDto } from './dto/update-application.dto.js';

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

  findOne(id: string): Application {
    const application = this.applications.find(
      (application) => application.id === id,
    );

    if (!application) {
      throw new NotFoundException(`Application with id ${id} was not found`);
    }

    return application;
  }

  create(createApplicationDto: CreateApplicationDto): Application {
    const application: Application = {
      id: randomUUID(),
      ...createApplicationDto,
      appliedAt: new Date().toISOString().slice(0, 10),
    };

    this.applications.push(application);

    return application;
  }

  update(id: string, updateApplicationDto: UpdateApplicationDto): Application {
    const application = this.findOne(id);

    Object.assign(application, updateApplicationDto);

    return application;
  }

  remove(id: string): Application {
    const application = this.findOne(id);

    const index = this.applications.indexOf(application);

    this.applications.splice(index, 1);

    return application;
  }
}
