import { ApplicationsService } from './applications.service.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    findAll(): import("./application.js").Application[];
    findOne(id: string): import("./application.js").Application;
    create(createApplicationDto: CreateApplicationDto): import("./application.js").Application;
}
