import { All, Injectable } from '@nestjs/common';
import { PrismaClient, User, Game, notificationType } from '@prisma/client';
import { GamesDTO, AllGames, topPlayers, RecentActivity, ProfileFriends } from '../dto/dto-classes';
import { create } from 'domain';
import { type } from 'os';

@Injectable()
export class HomeService {
    prisma = new PrismaClient();
	constructor(){}

    async Best6Players(user : User) {
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

		let topPlayers = await this.prisma.user.findMany({
			orderBy: {
			  XP: 'desc'
			},
		  });

		topPlayers = topPlayers.filter(user => !blockedUserIds.includes(user.UserId));

		const top6Players = topPlayers.slice(0, 6);

		const top = top6Players.map(player => ({
			avatar: player.avatar,
			username: player.username,
			XP: player.XP,
			level: player.level,
		}));

		return top;
	}

    async lastGame(user : User)
	{
		let lastGame = await this.prisma.game.findMany({
			where: {
				OR : [
					{PlayerId1: user.UserId},
					{ PlayerId2: user.UserId },
				]
			},
			orderBy: {
				CreationTime: 'desc',
			  },
			  take: 1,
		})
		if (lastGame.length != 0)
		{
			if (lastGame[0].isDraw === true)
				return "draw";
			else if (lastGame[0].WinnerId === user.UserId)
				return "won";
			return "lose";
		}
	}

    async RecentActivity(user : User)
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

		let allgames = await this.prisma.game.findMany({
			orderBy:{
				CreationTime : "desc",
			},
			include : {
				Player1 : {
					select : {
						username : true,
						avatar : true
					}
				},
				Player2 : {
					select : {
						username : true,
						avatar : true
					}
				},
				winner :{
					select :{
						username : true,
					}
				}
				
			}
		});

		allgames = allgames.filter(game => 
			!blockedUserIds.includes(game.PlayerId1) && 
			!blockedUserIds.includes(game.PlayerId2)
		  );

		const recently : RecentActivity[] = [];
		for (let i = 0; i < allgames.length; i++) {
			if (allgames[i].isDraw)
			{
				recently.push( {
					Player1 : allgames[i].Player2.username,
					Player1Avatar : allgames[i].Player2.avatar,
					Player2 : allgames[i].Player1.username,
					Player2Avatar : allgames[i].Player1.avatar,
					IsDraw : true,
				})
			}
			else if (allgames[i].WinnerId == allgames[i].PlayerId1)
			{
				recently.push( {
					Player1 : allgames[i].Player1.username,
					Player1Avatar : allgames[i].Player1.avatar,
					Player2 : allgames[i].Player2.username,
					Player2Avatar : allgames[i].Player2.avatar,
					IsDraw : false,
				})
			}
			else if (allgames[i].WinnerId == allgames[i].PlayerId2)
			{
				recently.push( {
					Player1 : allgames[i].Player2.username,
					Player1Avatar : allgames[i].Player2.avatar,
					Player2 : allgames[i].Player1.username,
					Player2Avatar : allgames[i].Player1.avatar,
					IsDraw : false,
				})
			}
		}
		return recently;
	}
}
