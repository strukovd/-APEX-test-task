import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Валидация
	app.useGlobalPipes(new ValidationPipe());

	// Получим провайдер конфигурации
	const config = await app.get(ConfigService);
	const port = config.get("PORT") || 3000;

	const packageJson = JSON.parse( fs.readFileSync(`${__dirname}/../../package.json`, {encoding: "utf-8"}) );
	const ver = packageJson.version;

	const openAPIOptions = new DocumentBuilder()
		.setTitle('Simple TODO')
		.setDescription('Note storage service')
		.setVersion(ver)
		.build();
	const document = SwaggerModule.createDocument(app, openAPIOptions);
	SwaggerModule.setup('api', app, document);

	await app.listen(port, ()=>{
		console.log(`Приложение запущено на порту: ${port}`);
	});
}
bootstrap();
