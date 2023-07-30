import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({cors : true, namespace : 'game'})
export class GameGateway implements OnGatewayConnection{
 
  handleConnection(client: any, ...args: any[]) {
    console.log('connected');
  }
}
