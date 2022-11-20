import { MigrationInterface, QueryRunner } from "typeorm";

export class seedinit1668361954706 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        INSERT INTO public.users (username, password, is_active, refresh_token)
        VALUES
        ('root', '123', true, null),
        ('admin', 'admin', true, null),
        ('user', 'user', false, null);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}

}

