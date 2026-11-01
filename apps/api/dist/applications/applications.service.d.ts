import type { Application } from './application.js';
import type { CreateApplicationDto } from './dto/create-application.dto.js';
import type { UpdateApplicationDto } from './dto/update-application.dto.js';
export declare class ApplicationsService {
    private readonly applications;
    findAll(): Application[];
    findOne(id: string): Application;
    create(createApplicationDto: CreateApplicationDto): Application;
    update(id: string, updateApplicationDto: UpdateApplicationDto): Application;
    remove(id: string): Application;
}
