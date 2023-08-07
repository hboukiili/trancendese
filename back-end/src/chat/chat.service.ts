import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class ChatService {

    constructor(private readonly prisma: PrismaClient) { }

    async check(roomId, UserId)
    {
        const RoomId = parseInt(roomId);

        const exist = await this.prisma.membership.findFirst({
            where : {
                UserId,
                RoomId,
                isBanned : false,
                isMuted : false,
            }
        })

        if (!exist)
            return false;
        return true;
    }

    async sendMessage(content: string, UserId: string, roomId: string) {

        const RoomId = parseInt(roomId);

        const send = await this.prisma.message.create({
            data: {
                UserId: UserId,
                Content: content,
                RoomId: RoomId,
            },
            include : {
                user: {
                    select:
                    {
                        avatar: true,
                        username: true,
                    }
                },
                room : {
                    select : {
                        ischannel : true,
                    }
                }
            }
        })

        var blocked = [];
        if (send.room.ischannel)
            blocked = await this.getBlockeduserIds(send.UserId, RoomId);
        send.user.avatar =  send.user.avatar && send.user.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !send.user.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + send.user.avatar : send.user.avatar;
        return {
            send, blocked, ischannel : send.room.ischannel
        };
    }

    async getMessageNotificationInfo(UserId, roomId)
    {
        const user = await this.prisma.user.findUnique({
            where : {
                UserId,
            },
            select : {
                avatar : true,
                username : true,
            }
        })

        const RoomId = parseInt(roomId);

        const room = await this.prisma.room.findUnique({
            where: {
              RoomId: RoomId,
            },
            include: {
              members: {
                where: {
                  UserId: {
                    not: UserId, 
                  },
                },
                select: {
                  UserId: true,  
                },
              },
            },
        });
            
        return {
            avatar : user.avatar && user.avatar.search("https://cdn.intra.42.fr/users/") === -1
                && !user.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + user.avatar
                    : user.avatar,
            username : user.username,
            Type : "Message",
            receiver : room.members[0].UserId,
        }
    }

    async getBlockeduserIds(user, roomId)
	{
		const blockedUser = await this.prisma.friendship.findMany({
			where : {
				OR : [
					{
						SenderId : user,
						OR : [
								{blockedBySender : true},
								{blockedByReceiver : true},
						]
					},
					{
						ReceiverId : user,
						OR : [
							{blockedBySender : true},
							{blockedByReceiver : true},
						]
					},
                    
				]
			},
			select : {
				SenderId : true,
				ReceiverId : true,
			}
		});

        const banned = await this.prisma.membership.findMany({
            where : {
                    RoomId : roomId,
                    isBanned : true,
            },
            select : {
                UserId : true,
            }
        })

		let blockedUserIds = blockedUser.map(friendship =>
			friendship.SenderId === user ? friendship.ReceiverId : friendship.SenderId
		);
	
        banned.map((user) => {
            blockedUserIds.push(user.UserId);
        })

		return blockedUserIds;
	}

}
