import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoRecordDto, TodoRecordInsertDto, TodoRecordUpdateDto } from './dto/todo-record.dto';
import { TodoRecordsEntity } from './models/todo_records.entity';

@Injectable()
export class TodoService {
	constructor(@InjectRepository(TodoRecordsEntity)
		private readonly todoRecordsRepository: Repository<TodoRecordsEntity>,
	) {}

	/**
     * Получить список всех записей
     * @returns массив TODO записей
     */
	async getAllRecords(): Promise<TodoRecordDto[]> {
		const records: TodoRecordsEntity[] = await this.todoRecordsRepository.find({take:500});

		// Если не найдено ни одной записи - 404
		if(!records.length) {
			throw new HttpException('Данные с БД не получены!', HttpStatus.NOT_FOUND);
		}
		else {
			return records;
		}
	}


	/**
     * Получить одну запись по ID
     * @returns одна TODO запись
     */
	async getRecordById(id: number): Promise<TodoRecordDto> {
		const record: TodoRecordsEntity = await this.todoRecordsRepository.findOne({ where: {id: id} });

		// Если запись не найдена - 404
		if(record === undefined) {
			throw new HttpException('Данные с БД не получены!', HttpStatus.NOT_FOUND);
		}
		else {
			return record;
		}

	}


	/**
     * Вставка новой записи
     * @returns ID новой записи
     */
	async setRecord(record: TodoRecordInsertDto): Promise<number> {
		const savedRecord = await this.todoRecordsRepository.save(record);
		return savedRecord.id;
	}


	/**
     * Обновление записи по ID
     * @returns ID обновленной записи
     */
	async updateRecordById(id: number, body: TodoRecordUpdateDto): Promise<number> {
		body['id'] = id;
		await this.todoRecordsRepository.update({id: id}, body); //save(body);
		return;
	}


	/**
     * Удаление записи по ID
     * @returns ID удаленной записи
     */
	async deleteRecordById(id: number): Promise<void> {
		await this.todoRecordsRepository.delete({id: id});
		return;
	}
}
