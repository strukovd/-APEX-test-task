import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class RefreshTokenGuard implements CanActivate { //extends AuthGuard('jwt-refresh') {
	constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		if(req.headers.authorization === undefined) {
			throw new UnauthorizedException({message: "Доступ ограничен!"});
		}
		else {
			const tokenType: string = String(req.headers.authorization).split(" ")[0];
			const token: string = String(req.headers.authorization).split(" ")[1];

			if(!tokenType || tokenType !== "Bearer") {
				throw new UnauthorizedException({message: "Доступ ограничен!"});
			}
			else {
				const payload = this.jwtService.verify(token, {secret: this.configService.get<string>("JWT_REFRESH_SECRET")});

				const user = await this.userRepository.findOne({select: ['refresh_token'], where:{id: payload.sub, is_active: true}});
        		if (!user) throw new BadRequestException('Пользователь не найден!');

				if(user.refresh_token === token) {
					req['payload'] = payload; // { sub: '2', username: 'user', iat: 1668299839, exp: 1668904639 }
					return true;
				}
				else {
					throw new UnauthorizedException({message: "Доступ ограничен!"});
				}
			}
		}
	}
}