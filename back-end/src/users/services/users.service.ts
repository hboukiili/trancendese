import { All, Injectable } from '@nestjs/common';
import { PrismaClient, User, Game, notificationType } from '@prisma/client';
import { GamesDTO, AllGames, topPlayers, RecentActivity, ProfileFriends } from '../dto/dto-classes';
import { create } from 'domain';
import { type } from 'os';

@Injectable()
export class UsersService {
	prisma = new PrismaClient();
	constructor(){}
    

    async	createUser(user : User){
		const newUser = await this.prisma.user.create({
			data: user,
		});
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

		await this.prisma.friendship.create ({
			data: {
			  sender: {
				connect: { UserId: User.UserId }
			  },
			  receiver: {
				connect: { UserId: receiverId }
			  },
			}
		});

		await this.prisma.notification.create({
			data: {
				UserId: receiverId,
				Type: notificationType.friendship_request, 
				isRead: false,
			  },
		})
	}

	async AcceptRequest(FriendshipId : number)
	{
		const friend = await this.prisma.friendship.update({
			where: { FriendshipId : FriendshipId,  },
			data: { Accepted : true},
		});

		await this.prisma.notification.create({
			data: {
				UserId: friend.SenderId,
				Type: notificationType.Accepted_request, 
				isRead: false,
			  },
		})
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

}
