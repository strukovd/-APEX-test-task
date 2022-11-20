import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TodoRecordDto {
	@ApiProperty()
		id: number;
	@ApiProperty({description: "Заголовок"})
		title: string;
	@ApiProperty({description: "Описание задачи"})
		content: string;
	@ApiProperty()
		order: number;

	constructor(title: string, content: string, order: number) {
		this.title = title;
		this.content = content;
		this.order = order;
	}
}

export class TodoRecordInsertDto {
	@ApiProperty()
		id?: number;
	@ApiProperty({description: "Заголовок"})
	@IsNotEmpty()
	@IsString()
		title: string;
	@ApiProperty({description: "Описание задачи"})
	@IsNotEmpty()
	@IsString()
		content: string;
	@ApiProperty()
	@IsNotEmpty({})
	@IsNumber()
		order: number;
}

export class TodoRecordUpdateDto {
	@ApiPropertyOptional({description: "Заголовок"})
	@IsString()
		title?: string;
	@ApiPropertyOptional({description: "Описание задачи"})
	@IsString()
		content?: string;
	@ApiPropertyOptional()
	@IsNumber()
		order?: number;
}
