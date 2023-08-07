import { All, Injectable } from '@nestjs/common';
import { PrismaClient, User, Game, notificationType, Prisma } from '@prisma/client';
import { GamesDTO, AllGames, topPlayers, RecentActivity, ProfileFriends, blockedlist, notification } from '../dto/dto-classes';
import { create } from 'domain';
import { type } from 'os';
import { EventsGateway } from '../events/events.gateway';


@Injectable()
export class UsersService {
	prisma = new PrismaClient();
	constructor(private readonly NotificationGateway : EventsGateway){}
    

	async notificationState(User : User)
	{
		const notifications = await this.getNotification(User);
		if (notifications)
		{
			for(let notification of notifications){
				if (!notification.isRead)
					return true;
			}
		}
		return false;
	}

    async	createUser(user : User){
		const newUser = await this.prisma.user.create({
			data: user,
		});

		const achievement = await this.prisma.achievement.create({
			data : {UserId : newUser.UserId}
		})
		return newUser;
	}

    async findOneUser(user : User){
		const findUser = await this.prisma.user.findUnique({
			where: {
				UserId: user.UserId,
			},
		});
		if (!findUser){
			return false;
		}
		return true;
    }


	async ReturnOneUser(user : User){
		const findUser = await this.prisma.user.findUnique({
			where: {
				email: user.email,
			},
		});
		if (!findUser){
			return findUser;
		}
		return findUser;
    }

	async updateUser(email, updatedObject)
	{
		try {
		const updatedUser = await this.prisma.user.update({
			where: { email: email },
			data: updatedObject
		  });
		  return updatedUser;
		}
		 catch (error) {
		  console.error("Error updating user:", error);
		  return null;
		}
	}

	async getNotification(User : User)
	{
		const blocks = await this.getBlockeduserIds(User);

		const notification = await this.prisma.notification.findMany({
			where : {
				receiverId : User.UserId,
			},
			select : 
			{
				NotificationId : true,
				senderId : true,
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
		});

		const notifications = notification.filter(user => !blocks.includes(user.senderId));

		const final : notification[] = notifications.map(user => {

			return {
				avatar : user.sender.avatar && user.sender.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !user.sender.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + user.sender.avatar : user.sender.avatar,
				username : user.sender.username,
				isRead : user.isRead,
				notificationId : user.NotificationId,
				Type : user.Type,
			}
		})
		return final;
	}

	async getBlockeduserIds(user : User)
	{
		const blockedUser = await this.prisma.friendship.findMany({
			where : {
				OR : [
					{
						SenderId : user.UserId,
						OR : [
								{blockedBySender : true},
								{blockedByReceiver : true},
						]
					},
					{
						ReceiverId : user.UserId,
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

		const blockedUserIds = blockedUser.map(friendship =>
			friendship.SenderId === user.UserId ? friendship.ReceiverId : friendship.SenderId
		);
	
		return blockedUserIds;
	}

	getBadge(level: number) {
		if (level < 5) {
		  return "bronze";
		} else if (level < 10) {
		  return "silver";
		} else if (level < 15) {
		  return "gold";
		} else if (level < 30) {
		  return "platinum";
		} else if (level < 50) {
		  return "diamond";
		} else if (level < 80) {
		  return "master";
		} else {
		  return "grandmaster";
		}
	  }

	async getallUsers(User : User, username)
	{
		var blocked = await this.getBlockeduserIds(User);

		blocked.push(User.UserId);

		const user = await this.prisma.user.findMany({
			where : {
				OR : 
				[
					{
						username :{
							startsWith : username,
							mode : 'insensitive',
						}
					},
					{
						FullName : {
							startsWith : username,
							mode : 'insensitive',
						}
					}
				]
			},
			take : 10,
		})

		const users = user.filter(filter => !blocked.includes(filter.UserId));

		const isFriend = await this.prisma.friendship.findMany({
			where : {
				OR : [
					{
						SenderId : User.UserId,
					},
					{
						ReceiverId : User.UserId,
					}
				],
				Accepted : true,
				blockedByReceiver : false,
				blockedBySender : false,
			},
			select : {
				sender : {
					select : 
					{
						UserId : true,
					}
				},
				receiver : {
					select : {
						UserId : true,
					}
				}
			},
		})

		var friends = isFriend.map(friend => {
			return friend.sender.UserId !== User.UserId ? friend.sender.UserId : friend.receiver.UserId;
		})


		const fetchusers = users.map((user) => {
			user.avatar = user.avatar && user.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !user.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + user.avatar : user.avatar;
			const check = friends.includes(user.UserId);
			const badge = this.getBadge(user.level);
			return {
				UserId : user.UserId,
				avatar : user.avatar,
				username : user.username,
				level : user.level,
				badge,
				status : user.status,
				isFriend : check,
			}
		})
		return fetchusers;
	}

	async ReadNotification(notificationId : number, User : User)
	{
		await this.prisma.notification.update({
			where : {NotificationId : notificationId},
			data : {isRead : true,}
		})
	}

	async ReadallNotification(User : User)
	{
		await this.prisma.notification.updateMany({
			where : {receiverId : User.UserId},
			data : {isRead : true},
		})
		return true;
	}

	async checkFaIsEnabled(User : User){
		const FA = await this.prisma.user.findMany({
			where : {
				UserId : User.UserId,
			},
			select :
			{
				FA_On : true,
				FAsecret : true,
			},
			take : 1,
		})
		if (FA)
		{
			const isFirst = FA[0].FAsecret ? false : true;
			return {isFirst, FA_ON : FA[0].FA_On};
		}
	}

	async sendGameInvitaion(receiver : string, User : User)
	{
		const notification = await this.prisma.notification.create({
			data : {
				senderId : User.UserId,
				receiverId : receiver,
				Type : notificationType.game_invitation,
				isRead : false,
			},
			select : 
			{
				NotificationId : true,
				receiverId : true,
				senderId : true,
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

		const websocketNotifiation = {
            avatar : notification.sender.avatar && notification.sender.avatar.search("https://cdn.intra.42.fr/users/") === -1
                && !notification.sender.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + notification.sender.avatar
                    : notification.sender.avatar,
            username : notification.sender.username,
            isRead : notification.isRead,
            Type : notification.Type,
			senderId : notification.sender.UserId,
			receiverId : notification.receiverId,
            notificationId : notification.NotificationId,
        };

        this.NotificationGateway.handleNotification(notification.receiverId, websocketNotifiation);
	}
}
