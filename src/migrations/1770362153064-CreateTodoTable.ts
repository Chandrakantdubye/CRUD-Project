import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodoTable1770362153064 implements MigrationInterface {
    name = 'CreateTodoTable1770362153064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Todo" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "Todo" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todo" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Todo" DROP COLUMN "description"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
