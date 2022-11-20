import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';



config();
const ormConfig: DataSourceOptions = {
	type: 'postgres',
	host: process.env['DB_HOST'],
	port: +process.env['DB_PORT'],
	username: process.env['DB_USERNAME'],
	password: process.env['DB_PASSWORD'],
	database: process.env['DB_DATABASE'],
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	subscribers: [],
	logging: true,
	synchronize: false,
	migrations: [__dirname + '/src/migrations/**/*{.ts,.js}'],
	migrationsTableName: 'migrations',
};


export default new DataSource(ormConfig);
