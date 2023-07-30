import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';
import { Server, Socket } from "socket.io"
import { Client } from 'socket.io/dist/client';
import { SocketIOMIDDELWARE } from 'src/auth/auth-services/ws';
import * as cookie from 'cookie';
import { UsersService } from 'src/users/services/users.service';
import { PrismaClient } from '@prisma/client';
import { threadId } from 'worker_threads';
import { EventsService } from './services/events.service';


@WebSocketGateway({cors : true, namespace : 'notification'})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly socketService : EventsService){}
  prisma = new PrismaClient();


  @WebSocketServer()
  server : Server

  	afterInit(client : Socket)
	{
		client.use(SocketIOMIDDELWARE() as any);
	}

	async handleConnection(client: Socket) {
		
		console.log('connected');

		await this.prisma.user.update({
			where : { UserId : client.data.playload.userId },
			data : { status : true},
		})

		this.socketService.storeSocket(client.data.playload.userId, client);
	}

	async handleDisconnect(client :Socket) {

		await this.prisma.user.update({
			where : { UserId : client.data.playload.userId },
			data : { status : false},
		})

		this.socketService.removeSocket(client.data.playload.userId, client);
	}

  	@SubscribeMessage('notification')
	handleNotification(clientId, data)
	{
		this.socketService.emitToClient(clientId, 'notification', data);
	}

	@SubscribeMessage('request')
	handleInvitation(clientId, data)
	{
		this.socketService.emitToClient(clientId, 'request', data);
	}

}
