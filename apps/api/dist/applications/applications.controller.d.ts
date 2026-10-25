import { ApplicationsService } from './applications.service.js';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    findAll(): import("./application.js").Application[];
}
