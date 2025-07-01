import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToPoliciais1748369746207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "policiais"
            ADD COLUMN "refresh_token" TEXT NULL,
            ADD COLUMN "refresh_token_expires_in" TIMESTAMP NULL
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "policiais"
        DROP COLUMN IF EXISTS "refresh_token",
        DROP COLUMN IF EXISTS "refresh_token_expires_in"
      `);
  }
}
