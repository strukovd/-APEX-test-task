import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Req,
	UseFilters,
	UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JWTErrorExceptionFilter } from './filters/jwt.filter';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('reg')
	@ApiOperation({summary: "Регистрация пользователя"})
	reg(@Body() createUserDto: CreateUserDto) {
		return this.authService.reg(createUserDto);
	}

	@Post('login')
	@ApiOperation({summary: "Авторизация"})
	login(@Body() data: AuthDto) {
  		return this.authService.login(data);
	}

	// @Get('logout')
	// @ApiOperation({summary: "Выход"})
	// logout(@Req() req: Request) {
  	// 	// this.authService.logout(req.user['sub']); TODO:
	// }

	@Put('refresh')
	@ApiOperation({summary: "Обновить токен", parameters: [{in: 'header', name: "Authorization", required: true, description: "Bearer refresh token"}]})
	@UseGuards(RefreshTokenGuard)
	@UseFilters(JWTErrorExceptionFilter)
	refreshToken(@Req() req) {
		return this.authService.refreshToken(req);
	}
}
