var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
let ApplicationEntity = class ApplicationEntity {
    id;
    company;
    position;
    status;
    appliedAt;
    location;
    jobUrl;
    source;
    notes;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "company", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "position", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ['applied', 'screening', 'technical', 'final', 'offer', 'rejected'],
    }),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "status", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "appliedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "location", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "jobUrl", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "source", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApplicationEntity.prototype, "notes", void 0);
ApplicationEntity = __decorate([
    Entity('applications')
], ApplicationEntity);
export { ApplicationEntity };
//# sourceMappingURL=application.entity.js.map