import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token has expired');
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}