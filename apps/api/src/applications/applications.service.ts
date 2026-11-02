import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateApplicationDto } from './dto/create-application.dto.js';
import type { UpdateApplicationDto } from './dto/update-application.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './application.entity.js';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationsRepository: Repository<ApplicationEntity>,
  ) {}

  findAll(): Promise<ApplicationEntity[]> {
    return this.applicationsRepository.find();
  }

  async findOne(id: string): Promise<ApplicationEntity> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Application with id ${id} was not found`);
    }

    return application;
  }

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationEntity> {
    const application = this.applicationsRepository.create({
      ...createApplicationDto,
      appliedAt: new Date().toISOString().slice(0, 10),
    });

    return this.applicationsRepository.save(application);
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<ApplicationEntity> {
    const application = await this.findOne(id);

    Object.assign(application, updateApplicationDto);

    return this.applicationsRepository.save(application);
  }

  async remove(id: string): Promise<ApplicationEntity> {
    const application = await this.findOne(id);

    return this.applicationsRepository.remove(application);
  }
}
