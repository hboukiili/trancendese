// import { Logger, UseGuards } from '@nestjs/common';
// import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { verify } from 'jsonwebtoken';
// import { Server, Socket } from "socket.io"
// import { Client } from 'socket.io/dist/client';
// import { WebSocketAuthGuard } from 'src/auth/auth-guard/WSjwt-guard';
// import { SocketIOMIDDELWARE } from 'src/auth/auth-services/ws';
// import * as cookie from 'cookie';


// @WebSocketGateway({ cors: { origin: '*', credentials: true } })
// // @UseGuards(WebSocketAuthGuard)
// export class EventsGateway {
//   @WebSocketServer()
//   server : Server

//   // afterInit(client : Socket)
//   // {
//   //   client.use(SocketIOMIDDELWARE() as any);  
//   //   Logger.log('afterInit'); 
//   // }

//   handleConnection(client: Socket, ...args: any[]) {
//     const request = client.handshake;
//     // console.log(`Client connected: ${client.id}`);
//     // console.log('Cookies:', request.headers.cookie);
//     const cookies = cookie.parse(request.headers.cookie);

//     const token = request.headers.cookie;
//     console.log(token);
//     // try {
//     //   const decoded = verify(token, process.env.SECRET_KEY);
//     //   console.log(decoded);
//     // } catch (e) {
//     //   console.log('Invalid token', e);
//     // }
//   }

//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any): string {
//     console.log('m here');
//     return 'Hello world!';
//   }

// }
