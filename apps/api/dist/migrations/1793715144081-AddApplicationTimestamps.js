export class AddApplicationTimestamps1793715144081 {
    name = 'AddApplicationTimestamps1793715144081';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "applications" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "createdAt"`);
    }
}
//# sourceMappingURL=1793715144081-AddApplicationTimestamps.js.map