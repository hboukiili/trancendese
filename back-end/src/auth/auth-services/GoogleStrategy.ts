import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
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
        const user =  {
			UserId: profile.id,
			email: profile.emails[0].value,
			FullName: profile.displayName,
			avatar: profile.photos[0].value,
			username: profile.displayName,
			FA_On: false,
			createdAt: new Date(),
		}
        return user;
    }
}

