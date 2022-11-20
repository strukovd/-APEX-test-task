import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: "todo_records"})
export class TodoRecordsEntity {
	@PrimaryColumn()
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		title: string;

	@Column()
		content: string;

	@Column()
		order: number;
}

