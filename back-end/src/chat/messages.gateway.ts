import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { SocketIOMIDDELWARE } from 'src/auth/auth-services/ws';
import { EventsGateway } from 'src/users/events/events.gateway';
import { ChatService } from './chat.service';
import { exit } from 'process';

@WebSocketGateway({cors : true, namespace : 'chat'})
export class ChatGateway implements OnGatewayConnection{
    @WebSocketServer() server: Server;
    private rooms: { [roomName: string]: Socket[] } = {};


  constructor(private readonly ChatService : ChatService, private readonly Notification : EventsGateway)
  {}

    afterInit(client : Socket)
    {
        client.use(SocketIOMIDDELWARE() as any);
    }

    async handleConnection(client: Socket) {
    }

    handleDisconnect(client)
    {
        for (const roomName in this.rooms) {
            this.rooms[roomName] = this.rooms[roomName].filter((socket) => socket.id !== client.id);
            if (this.rooms[roomName].length === 0) {
                delete this.rooms[roomName];
            }
        }
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, roomId: string) {

        if (!this.rooms[roomId]) {
            this.rooms[roomId] = [];
        }

        this.rooms[roomId].push(client);

        client.join(roomId);

    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: { RoomId: string, message: string }) {

        const exist = await this.ChatService.check(payload.RoomId, client.data.playload.userId);
        
        if (exist && this.rooms[payload.RoomId])
        {
            const message = await this.ChatService.sendMessage(payload.message, client.data.playload.userId, payload.RoomId);
            if (!message.ischannel || !message.blocked.length)
            {
                this.server.to(payload.RoomId).emit('message', message.send);
                const receiver = this.rooms[payload.RoomId].filter((user) => user.data.playload.userId !== client.data.playload.userId);
                if (!message.ischannel && !receiver.length)
                {
                    const notification = await this.ChatService.getMessageNotificationInfo(client.data.playload.userId, payload.RoomId);
                    this.Notification.handleMessages(notification.receiver, notification, notification.receiver);
                }
            }
            else 
            {
                const room = this.rooms[payload.RoomId].filter((socket) => !message.blocked.includes(socket.data.playload.userId));

                room.map((client) =>
                {
                    this.server.to(client.id).emit('message', message.send);
                })
            }
        }
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, roomId: string) {
        client.leave(roomId);
    }

    async kickuser(roomId, UserId)
    {
        this.rooms[roomId] = this.rooms[roomId].filter((user) => {
            if (user.data.playload.userId === UserId) {
              user.disconnect();
              return false;
            }
            return true;
        });
    }
}
