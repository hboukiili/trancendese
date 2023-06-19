import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaClient, User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';


@Injectable()
export class JwtService extends PassportStrategy(Strategy, 'jwt') {
    prisma = new PrismaClient;
    constructor(private readonly UsersService : UsersService) {
    super({
      jwtFromRequest: (req) => req.token,
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload) {
    const found = await this.UsersService.ReturnOneUser(payload);
    if (!found) {
      throw new UnauthorizedException();
    }
    return found;
  }
}