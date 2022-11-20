import { MigrationInterface, QueryRunner } from "typeorm";

export class seedinit1668361954706 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            INSERT INTO public.todo_records
                (title, content, "order")
            VALUES
                ('Задача 1', 'Выполнить задачу 1', 1),
                ('Задача 2', 'Выполнить задачу 2', 2),
                ('Задача 3', 'Выполнить задачу 3', 3),
                ('Задача 4', 'Выполнить задачу 4', 4),
                ('Задача 5', 'Выполнить задачу 5', 5),
                ('Задача 6', 'Выполнить задачу 6', 6),
                ('Задача 7', 'Выполнить задачу 7', 7),
                ('Задача 8', 'Выполнить задачу 8', 8),
                ('Задача 9', 'Выполнить задачу 9', 9),
                ('Задача 10', 'Выполнить задачу 10', 10);
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}

}

