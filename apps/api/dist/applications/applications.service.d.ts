import type { Application } from './application.js';
import type { CreateApplicationDto } from './dto/create-application.dto.js';
export declare class ApplicationsService {
    private readonly applications;
    findAll(): Application[];
    findOne(id: string): Application;
    create(createApplicationDto: CreateApplicationDto): Application;
}
