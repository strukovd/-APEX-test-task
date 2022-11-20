import { MigrationInterface, QueryRunner } from "typeorm";

export class init1668361954706 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            create table todo_records
            (
                id serial not null
                    constraint "PK_ID"
                        primary key,
                title varchar not null,
                content varchar not null,
                "order" integer not null
            );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE todo_records;`);
	}

}

