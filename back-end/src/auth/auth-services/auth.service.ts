import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import * as otplib from 'otplib';
import * as qrcodeLib from 'qrcode';


@Injectable()
export class AuthService {
	prisma = new PrismaClient();

    constructor(private readonly jwtService: JwtService){}

	async generateJwtToken(user : User){
		return this.jwtService.sign({ userId: user.UserId, email: user.email, username: user.username, avatar : user.avatar});
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

	async GenerateQrCode(user : User)
	{
		const secret = otplib.authenticator.generateSecret();
		const otpAuth = otplib.authenticator.keyuri(user.username, "Trancendence", secret);
		const update = await this.prisma.user.update({
			where : {UserId : user.UserId},
			data : {FAsecret : secret},
		});
		const qrcode = await qrcodeLib.toDataURL(otpAuth);
		return qrcode;
	}

	async checkvaliditionof2fa(user : User, code)
	{
		const FA : User = await this.prisma.user.findFirst({
			where : {
				UserId : user.UserId,
			}
		})
 
		const verify = otplib.authenticator.check(code, user.FAsecret);

		if (!FA.FA_On && verify)
		{
			await this.prisma.user.update({
				where : {UserId : user.UserId},
				data : {FA_On : verify},
			});
		}
		return verify;
	}

	async disableFA(User : User)
	{
		const change = await this.prisma.user.update({
			where : { UserId : User.UserId},
			data : {
				FA_On : false,
			}
		})
	}
}
