import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRecordsEntity } from './models/todo_records.entity';
import { TodoController } from './todo.controller';
import { TodoGuard } from './todo.guard';
import { TodoService } from './todo.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forFeature([TodoRecordsEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_ACCESS_SECRET'),
				signOptions: {
					expiresIn: configService.get<string>('JWT_ACCESS_SECRET_EXPIRATION_TIME'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [TodoController],
	providers: [TodoService, TodoGuard]
})
export class TodoModule {}
