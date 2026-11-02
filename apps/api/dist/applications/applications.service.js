var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './application.entity.js';
let ApplicationsService = class ApplicationsService {
    applicationsRepository;
    constructor(applicationsRepository) {
        this.applicationsRepository = applicationsRepository;
    }
    findAll() {
        return this.applicationsRepository.find();
    }
    async findOne(id) {
        const application = await this.applicationsRepository.findOne({
            where: { id },
        });
        if (!application) {
            throw new NotFoundException(`Application with id ${id} was not found`);
        }
        return application;
    }
    async create(createApplicationDto) {
        const application = this.applicationsRepository.create({
            ...createApplicationDto,
            appliedAt: new Date().toISOString().slice(0, 10),
        });
        return this.applicationsRepository.save(application);
    }
    async update(id, updateApplicationDto) {
        const application = await this.findOne(id);
        Object.assign(application, updateApplicationDto);
        return this.applicationsRepository.save(application);
    }
    async remove(id) {
        const application = await this.findOne(id);
        return this.applicationsRepository.remove(application);
    }
};
ApplicationsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(ApplicationEntity)),
    __metadata("design:paramtypes", [Repository])
], ApplicationsService);
export { ApplicationsService };
//# sourceMappingURL=applications.service.js.map