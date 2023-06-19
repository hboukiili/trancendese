import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/auth/auth-services/auth.service';

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.cookies['access_token'];
    // console.log(token);
      if (token) {
      req.token = token;
    }
    next();
  }
}
