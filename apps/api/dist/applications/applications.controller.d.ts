import { ApplicationsService } from './applications.service.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationDto } from './dto/update-application.dto.js';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    findAll(): import("./application.js").Application[];
    findOne(id: string): import("./application.js").Application;
    create(createApplicationDto: CreateApplicationDto): import("./application.js").Application;
    update(id: string, updateApplicationDto: UpdateApplicationDto): import("./application.js").Application;
    remove(id: string): import("./application.js").Application;
}
