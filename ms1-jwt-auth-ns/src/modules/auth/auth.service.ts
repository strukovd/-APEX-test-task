import { BadRequestException, Injectable } from '@nestjs/common';
// import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
	constructor(
	@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
	) {}


	async reg(createUserDto: CreateUserDto): Promise<any> {
		const user = await this.userRepository.findOne({where:{username: createUserDto.username}});
		if (user) {
			throw new BadRequestException('Пользователь уже существует!');
		}

		// TODO: Hash password
		const hash = await this.hashData(createUserDto.password);
		const createdUser = await this.userRepository.save(createUserDto);

		const tokens = await this.getTokens( String(createdUser.id), createdUser.username);
		this.userRepository.update({id: createdUser.id}, {refresh_token: tokens.refreshToken});
		return tokens;
	}


	async login(data: AuthDto) {
		const user = await this.userRepository.findOne({where:{username: data.username}}); // Ищем юзера в БД
		if (!user) throw new BadRequestException('Пользователь не найден!');

		// TODO: password to hash
		// const passwordMatches = await argon2.verify(user.password, data.password); // сверяет пароли (из БД и присланный-хеширует)
		if (user.password !== data.password)
			throw new BadRequestException('Неверный пароль!');

		const tokens = await this.getTokens(String(user.id), user.username); // генерирует новые токены
		this.userRepository.update({id: user.id}, {refresh_token: tokens.refreshToken}); // Запишем refreshToken в пользовательскую запись БД
		return tokens;
	}


	async logout(userId: number): Promise<void> {
		this.userRepository.update({id: userId}, {refresh_token: null});
	}


	async refreshToken(req) {
		const tokens = await this.getTokens(String(req.payload.sub), req.payload.username); // генерирует новые токены
		this.userRepository.update({id: req.payload.sub}, {refresh_token: tokens.refreshToken}); // Запишем refreshToken в пользовательскую запись БД
		return tokens;
	}


	hashData(data: string) {
		// return argon2.hash(data);
	}

	// async updateRefreshToken(userId: string, refreshToken: string) {
	// 	const hashedRefreshToken = await this.hashData(refreshToken);
	// 	await this.usersService.update(userId, {
	// 		refreshToken: hashedRefreshToken,
	// 	});
	// }

	async getTokens(userId: string, username: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{sub: userId, username},
				{
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
					expiresIn: this.configService.get<string>('JWT_ACCESS_SECRET_EXPIRATION_TIME')
				}
			),
			this.jwtService.signAsync(
				{sub: userId, username},
				{
					secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
					expiresIn: this.configService.get<string>('JWT_REFRESH_SECRET_EXPIRATION_TIME')
				},
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}
}