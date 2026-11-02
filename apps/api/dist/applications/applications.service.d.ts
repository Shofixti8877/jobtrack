import type { CreateApplicationDto } from './dto/create-application.dto.js';
import type { UpdateApplicationDto } from './dto/update-application.dto.js';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './application.entity.js';
export declare class ApplicationsService {
    private readonly applicationsRepository;
    constructor(applicationsRepository: Repository<ApplicationEntity>);
    findAll(): Promise<ApplicationEntity[]>;
    findOne(id: string): Promise<ApplicationEntity>;
    create(createApplicationDto: CreateApplicationDto): Promise<ApplicationEntity>;
    update(id: string, updateApplicationDto: UpdateApplicationDto): Promise<ApplicationEntity>;
    remove(id: string): Promise<ApplicationEntity>;
}
