import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class EventsService {
    private socketsMap: Map<string, Socket[]> = new Map();

    storeSocket(clientId: string, socket: Socket): void {
      const sockets = this.socketsMap.get(clientId) || [];
      sockets.push(socket);
      this.socketsMap.set(clientId, sockets);
    }
  
    getSocket(clientId: string): Socket[] | undefined {
      return this.socketsMap.get(clientId);
    }
  
    removeSocket(clientId: string, socket: Socket): boolean {
		const sockets = this.socketsMap.get(clientId);
		if (sockets) {
			const index = sockets.indexOf(socket);
			if (index !== -1) {
				sockets.splice(index, 1);
				if (sockets.length === 0) {
				this.socketsMap.delete(clientId);
				}
				return true;
			}
		}
		return false;
    }
  
    emitToClient(clientId: string, event: string, data: any): boolean {

		const sockets = this.socketsMap.get(clientId);
		if (sockets) {
			sockets.forEach(socket => {
				socket.emit(event, data);
		});
			return true;
		}
		return false;
    }
  
    emitToAll(event: string, data: any): void {

		for (const sockets of this.socketsMap.values()) {
			sockets.forEach(socket => {
				socket.emit(event, data);
			});
		}
	}
}
