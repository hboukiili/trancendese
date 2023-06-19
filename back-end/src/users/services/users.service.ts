import { All, Injectable } from '@nestjs/common';
import { PrismaClient, User, Game } from '@prisma/client';
import { GamesDTO, AllGames, topPlayers } from '../dto/dto-classes';

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

		for (let i = 0; i < allgames.length; i++){

		}
		console.log(allgames);
	}

	async fetchgame(user : User)
	{
		let games = await this.prisma.game.findMany({
			where: {
				OR: [
					{ PlayerId1: user.UserId },
					{ PlayerId2: user.UserId },
				],
			},
			orderBy:{
				CreationTime : "desc"
			}
		})
		const Draw = await this.prisma.game.count({
			where:{
				isDraw: true,
				OR: [
					{ PlayerId1: user.UserId },
					{ PlayerId2: user.UserId },
				],
			}
		});

		const win = await this.prisma.game.count({
			where:{
				WinnerId: user.UserId,
				OR: [
					{ PlayerId1: user.UserId },
					{ PlayerId2: user.UserId },
				],
			}
		});

		const loose = games.length - (win + Draw);


		let i = 0;

		let AllGames : GamesDTO [] = [];
		let won;
		let isadv;
		for (; i < games.length; i++){
			let { GameId, Mode, Result, isDraw, Rounds } = games[i];
			if (games[i].WinnerId == user.UserId)
				won = true;
			else
				won = false;
			if (games[i].PlayerId1 === user.UserId)
				isadv = games[i].PlayerId2;
			else
				isadv = games[i].PlayerId1;
			let adv = await this.prisma.user.findUnique({
				where : {
					UserId : isadv,
				}
			});

			let Game: GamesDTO = {
				GameId: GameId.toString(),
				Mode: Mode,
				Result: Result,
				isDraw: isDraw,
				Rounds: Rounds,
				won: won,
				advPic : adv.avatar,
				AdvName: adv.username,
			};
			AllGames.push(Game);
		}
	
		return {
			win,
			loose,
			Draw,
			AllGames
		};
	}
}
