import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplicationTimestamps1793715144081 implements MigrationInterface {
    name = 'AddApplicationTimestamps1793715144081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "createdAt"`);
    }

}
