import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodoGuard implements CanActivate {
	constructor(
		private jwtService: JwtService
	) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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
				const payload = this.jwtService.verify(token);
				return true;
			}
		}
	}
}
