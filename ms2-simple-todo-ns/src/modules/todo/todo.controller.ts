import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { TodoRecordDto, TodoRecordInsertDto, TodoRecordUpdateDto } from './dto/todo-record.dto';
import { JWTErrorExceptionFilter } from './filters/jwt.filter';
import { TodoGuard } from './todo.guard';
import { TodoService } from './todo.service';
import {ApiTags, ApiOperation} from '@nestjs/swagger';

@ApiTags('TODO methods')
@Controller()
export class TodoController {
	constructor(private todoService: TodoService) {}

	@Get()
    @ApiOperation({summary: "Список всех записей", description: "Авторизация не требуется"})
	async getAllRecords(): Promise<TodoRecordDto[]> {
		const records = await this.todoService.getAllRecords();
		return records;
	}

	@Get(":id")
	@ApiOperation({summary: "Получить запись по ID", parameters: [{in: 'header', name: "Authorization", required: true, description: "Bearer tokens"}]})
    @UseGuards(TodoGuard)
	@UseFilters(JWTErrorExceptionFilter)
	async getRecordById(@Param("id") id: number): Promise<TodoRecordDto> {
    	return this.todoService.getRecordById(id);
	}

	@Post()
    @ApiOperation({summary: "Добавление новой записи", parameters: [{in: 'header', name: "Authorization", required: true, description: "Bearer token"}]})
    @UseGuards(TodoGuard)
	@UseFilters(JWTErrorExceptionFilter)
	setRecord(@Body() body: TodoRecordInsertDto): void {
    	this.todoService.setRecord(body);
	}

	@Put(":id")
	@ApiOperation({summary: "Обновление записи по ID", description: "Обноваляет полученные поля в БД. Все поля явл. необязательными", parameters: [{in: 'header', name: "Authorization", required: true, description: "Bearer token"}]})
    @UseGuards(TodoGuard)
	@UseFilters(JWTErrorExceptionFilter)
	updateRecordById(@Param("id") id: number, @Body() body: TodoRecordUpdateDto): void {
    	this.todoService.updateRecordById(id, body);
	}

	@Delete(":id")
	@ApiOperation({summary: "Удаление записи по ID", parameters: [{in: 'header', name: "Authorization", required: true, description: "Bearer token"}]})
	@UseGuards(TodoGuard)
	@UseFilters(JWTErrorExceptionFilter)
	deleteRecordById(@Param("id") id: number): void {
    	this.todoService.deleteRecordById(id);
	}
}
