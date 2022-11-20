import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TodoModule,
		ConfigModule.forRoot({isGlobal: true}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.get('DB_HOST'),
					port: +configService.get('DB_PORT'),
					username: configService.get('DB_USERNAME'),
					password: configService.get('DB_PASSWORD'),
					database: configService.get('DB_DATABASE'),
					entities: [__dirname + '/**/*.entity{.ts,.js}'],
					synchronize: false,
					logging: false,
					migrations: [__dirname + '/src/migrations/**/*{.ts,.js}']
				};
			},
			inject: [ConfigService],
		})
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
