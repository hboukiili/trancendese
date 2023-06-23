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
		const top6Players = await this.prisma.user.findMany({
			orderBy: {
			  XP: 'desc'
			},
			take: 6
		  });
		  let top : topPlayers[] = [];
		  for (let i = 0; i < top6Players.length; i++){
			  top.push({
				avatar: top6Players[i].avatar,
				username : top6Players[i].username,
				XP : top6Players[i].XP,
				level : top6Players[i].level,
			  });
		}
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

    async RecentActivity()
	{
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
