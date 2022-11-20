
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

@Catch(JsonWebTokenError)
export class JWTErrorExceptionFilter implements ExceptionFilter {
	catch(exception: JsonWebTokenError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = HttpStatus.FORBIDDEN;
		response
			.status(status)
			.json({
				message: "Не валидный JWT токен",
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: request.url,
			});
	}
}


