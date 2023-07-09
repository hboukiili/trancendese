// import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { verify } from 'jsonwebtoken';
// import { Socket } from 'socket.io';

// @Injectable()
// export class WebSocketAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> {
//     const client : Socket = context.switchToWs().getClient();
//     const token = client.handshake.query.accessToken;
//     WebSocketAuthGuard.validate(client); 
//     return true;
//   }

//   static validate(client : Socket)
//   {
//       const { authorization } = client.handshake.headers;
//       Logger.log({authorization});
//       const token : string = authorization.split(' ')[1];
//       const playload = verify(token, process.env.SECRET_KEY);
//       return playload;
//   }
// }