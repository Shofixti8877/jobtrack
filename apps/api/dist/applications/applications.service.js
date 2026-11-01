var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
let ApplicationsService = class ApplicationsService {
    applications = [
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
    findAll() {
        return this.applications;
    }
    findOne(id) {
        const application = this.applications.find((application) => application.id === id);
        if (!application) {
            throw new NotFoundException(`Application with id ${id} was not found`);
        }
        return application;
    }
    create(createApplicationDto) {
        const application = {
            id: randomUUID(),
            ...createApplicationDto,
            appliedAt: new Date().toISOString().slice(0, 10),
        };
        this.applications.push(application);
        return application;
    }
    update(id, updateApplicationDto) {
        const application = this.findOne(id);
        Object.assign(application, updateApplicationDto);
        return application;
    }
    remove(id) {
        const application = this.findOne(id);
        const index = this.applications.indexOf(application);
        this.applications.splice(index, 1);
        return application;
    }
};
ApplicationsService = __decorate([
    Injectable()
], ApplicationsService);
export { ApplicationsService };
//# sourceMappingURL=applications.service.js.map