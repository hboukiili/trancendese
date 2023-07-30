import { All, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient, User, Game, notificationType } from '@prisma/client';
import { GamesDTO, AllGames, topPlayers, RecentActivity, ProfileFriends, blockedlist, request } from '../dto/dto-classes';
import { create } from 'domain';
import { type } from 'os';
// import { NotificationGateway } from ;
import { v4 as uuidv4 } from 'uuid';
import { EventsGateway } from '../events/events.gateway';


@Injectable()
export class FriendshipService {
    prisma = new PrismaClient();
	constructor(private readonly NotificationGateway : EventsGateway){}

    async sendRequest(User : User, receiverId : string)
    {
        const existingRequest = await this.prisma.friendship.findFirst({
            where: {
                SenderId: User.UserId,
                ReceiverId: receiverId
            }
        });

        if (existingRequest)
            return true;

        try {

            var invite = await this.prisma.friendship.create ({
                data: {
                    sender: {
                    connect: { UserId: User.UserId }
                    },
                    receiver: {
                    connect: { UserId: receiverId }
                    },
                },
                select : {
                    FriendshipId : true,
                    ReceiverId : true,
                    sender : {
                        select : {
                            UserId : true,
                            avatar : true,
                            username : true,
                        }
                    }
                }
            });
        }  catch (error) {
            if (error)
                throw new InternalServerErrorException('something went wrong');
        }

        invite.sender.avatar =  invite.sender.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !invite.sender.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + invite.sender.avatar : invite.sender.avatar;
        // console.log(invite.sender.avatar);
        const final = {
            friendshipId : invite.FriendshipId,
            UserId : invite.sender.UserId,
            avatar : invite.sender.avatar,
            username : invite.sender.username,
        };

        this.NotificationGateway.handleInvitation(invite.ReceiverId, invite);
	}

	async AcceptRequest(FriendshipId : number, User : User)
	{
        const exist = await this.prisma.friendship.findFirst({
            where : {
                FriendshipId : FriendshipId,
            }
        })

        if (!exist)
            return ;

        try {
            var friend = await this.prisma.friendship.update({
                where: { FriendshipId : FriendshipId},
                data: { Accepted : true},
            });
        } catch (error) {
            if (error)
                throw new InternalServerErrorException('no friendship request has been found');
        }

		const notification =  await this.prisma.notification.create({
            data: {
                senderId : User.UserId,
                receiverId : friend.SenderId,
                Type: notificationType.Accepted_request, 
                isRead: false,
                },
                select : 
                {
                    NotificationId : true,
                    senderId : true,
                    receiverId : true,
                    Type : true,
                    isRead : true,
                    sender : {
                        select : {
                            username : true,
                            avatar : true,
                            UserId : true,
                        }
                    }
                }

		})

        notification.sender.avatar =  notification.sender.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !notification.sender.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + notification.sender.avatar : notification.sender.avatar;
        const websocketNotifiation = {
            avatar : notification.sender.avatar,
            username : notification.sender.username,
            isRead : notification.isRead,
            Type : notification.Type,
            notificationId : notification.NotificationId,
        };

        this.NotificationGateway.handleNotification(notification.receiverId, websocketNotifiation);

        const RoomNAme = uuidv4();

        const check = await this.checkRoom(notification.receiverId, notification.senderId);
    
        if (!check)
        {
            await this.prisma.$transaction(async (prisma) => {
                const room = await prisma.room.create({ data: { RoomNAme } });
                await prisma.membership.createMany({ data: [ { RoomId: room.RoomId, UserId : notification.receiverId },
                                                            { RoomId: room.RoomId, UserId : notification.senderId } ]
                });
            });
        }
	}

    async checkRoom(UserId1, UserId2)
    {
        console.log(UserId1, UserId2);
        const user1Memberships = await this.prisma.membership.findMany({
            where: {
              UserId: UserId1,
            },
            select: {
              RoomId: true,
            },
        });

        const sharedRoom = await this.prisma.membership.findFirst({
            where: {
              UserId: UserId2,
              RoomId: {
                in: user1Memberships.map((membership) => membership.RoomId),
              },
              room: {
                ischannel: false,
              },
            },
            select : {
                RoomId : true,
            }
        });


        return sharedRoom;
    }


	async cancelRequest(FriendshipId : number)
	{
        const exist = await this.prisma.friendship.findFirst({
            where : {
                FriendshipId : FriendshipId,
            }
        })

        if (!exist)
            return ;
        
        try { 
            const friendship = await this.prisma.friendship.delete({
                where: {
                FriendshipId: FriendshipId
                },
            });
        }  catch (error) {
            if (error)
                throw new InternalServerErrorException('no friendship request has been found');
        }
		return true;
	}

    async getFriendshipRequest(User : User)
    {
        const request = await this.prisma.friendship.findMany({
            where : {
                ReceiverId : User.UserId,
                Accepted : false,
            },
            select : {
                FriendshipId : true,
                sender : {
                    select : {
                        UserId : true,
                        avatar : true,
                        username : true,
                    }
                }
            }
        });


        const friendshipRequest  = request.map((user) => {
            user.sender.avatar = user.sender.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !user.sender.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + user.sender.avatar : user.sender.avatar;
            return {
                friendshipId : user.FriendshipId,
                UserId : user.sender.UserId,
                avatar : user.sender.avatar,
                username : user.sender.username,
            }
        })
        return friendshipRequest;
    }
}

