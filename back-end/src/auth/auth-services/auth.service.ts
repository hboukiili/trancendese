import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
    
    constructor(private readonly jwtService: JwtService){}

	async generateJwtToken(user : User){
		return this.jwtService.sign({ userId: user.UserId, email: user.email, username: user.username});
	}

	async generateRefreshJwtToken(user : User){
		return jwt.sign({ userId: user.UserId, email: user.email, username: user.username}, process.env.SECRET_KEY, { expiresIn: '30d' });
	}

	async getUserFromRefreshToken(token: string) {
		try {
			const payload = this.jwtService.verify(token);

			return payload;
		} catch (err) {
			throw new UnauthorizedException('Invalid refresh token');
		}
	}

	logout(@Res() res)
	{
		res.clearCookie('access_token');
		res.clearCookie('refresh_token');
		res.clearCookie('isAuthenticated');
		res.redirect(process.env.FrontIp + '/login');
	}
}
