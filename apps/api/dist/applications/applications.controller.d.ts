import { ApplicationsService } from './applications.service.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationDto } from './dto/update-application.dto.js';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    findAll(): Promise<import("./application.entity.js").ApplicationEntity[]>;
    findOne(id: string): Promise<import("./application.entity.js").ApplicationEntity>;
    create(createApplicationDto: CreateApplicationDto): Promise<import("./application.entity.js").ApplicationEntity>;
    update(id: string, updateApplicationDto: UpdateApplicationDto): Promise<import("./application.entity.js").ApplicationEntity>;
    remove(id: string): Promise<import("./application.entity.js").ApplicationEntity>;
}
