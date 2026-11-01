var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
const APPLICATION_STATUSES = [
    'applied',
    'screening',
    'technical',
    'final',
    'offer',
    'rejected',
];
export class CreateApplicationDto {
    company;
    position;
    status;
    location;
    jobUrl;
    source;
    notes;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "company", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "position", void 0);
__decorate([
    IsIn(APPLICATION_STATUSES),
    __metadata("design:type", Object)
], CreateApplicationDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "location", void 0);
__decorate([
    IsOptional(),
    IsUrl(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "jobUrl", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "source", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "notes", void 0);
//# sourceMappingURL=create-application.dto.js.map