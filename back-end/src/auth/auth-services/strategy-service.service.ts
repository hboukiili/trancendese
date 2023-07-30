import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-42';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { Request } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class intraStrategie extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID : process.env.IntraClient,
      clientSecret : process.env.IntraSecret,
      callbackURL: process.env.IntraCallbackUrl,
    });
  }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
		// console.log(profile);
		const user =  {
			UserId: profile.id,
			email: profile._json.email,
			FullName: profile.displayName,
			avatar: profile._json.image.versions.medium,
			username: profile.username,
			FA_On: false,
			createdAt: new Date(),
		}
		done(null, user);
  	}
}
