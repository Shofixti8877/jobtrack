export class InitialApplications1793714560527 {
    async up(queryRunner) {
        await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
  `);
        await queryRunner.query(`
    CREATE TYPE "public"."applications_status_enum" AS ENUM (
      'applied',
      'screening',
      'technical',
      'final',
      'offer',
      'rejected'
    )
  `);
        await queryRunner.query(`
    CREATE TABLE "applications" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "company" character varying NOT NULL,
      "position" character varying NOT NULL,
      "status" "public"."applications_status_enum" NOT NULL,
      "appliedAt" date NOT NULL,
      "location" character varying,
      "jobUrl" character varying,
      "source" character varying,
      "notes" text,
      CONSTRAINT "PK_938c0a27255637bde919591888f"
        PRIMARY KEY ("id")
    )
  `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
    DROP TABLE "applications"
  `);
        await queryRunner.query(`
    DROP TYPE "public"."applications_status_enum"
  `);
    }
}
//# sourceMappingURL=1793714560527-InitialApplications.js.map