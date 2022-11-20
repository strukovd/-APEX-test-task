import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: "users"})
export class UserEntity {
	@PrimaryColumn()
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		username: string;

	@Column()
	    password: string;

	@Column()
		is_active: boolean;

    @Column({nullable: true})
    	refresh_token: string;
}

