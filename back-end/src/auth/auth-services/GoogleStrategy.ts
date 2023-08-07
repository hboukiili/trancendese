import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import { Profile } from "passport";
import { Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

    constructor(){
        super({
            clientID: process.env.GoogleIdClient,
            clientSecret: process.env.GoogleSecre,
            callbackURL: process.env.GoogleCallbackUrl,
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken : string, refreshToken: string, profile : Profile){
        const prisma = new PrismaClient;
        let username : string = profile.name.givenName[0] + profile.name.familyName + randomInt(0, 1000).toString();
        let found = await prisma.user.findUnique({
            where :{
                username,
            }
        });
        if (found)
        {
            while (found)
            {
                username = profile.name.givenName[0] + profile.name.familyName + randomInt(0, 1000).toString();
                found = await prisma.user.findUnique({
                    where :{
                        username,
                    }
                });   
            }
        }
        const user =  {
			UserId: profile.id,
			email: profile.emails[0].value,
			FullName: profile.displayName,
			avatar: null,
			username,
			FA_On: false,
			createdAt: new Date(),
		}
        return user;
    }
}

