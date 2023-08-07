import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { Socket } from 'socket.io';
import { GameDto } from './gameDto';
import { GameGateway } from './game.gateway';

@Injectable()
export class GameService {

	constructor(
		private readonly prisma: PrismaClient,
		private readonly GameSocket : GameGateway,
	) { }

	async calcullevel(User : User, PlayerId, Data : GameDto)
	{

		const Player = await this.prisma.user.findFirst({
			where : {
				UserId : PlayerId,
			}
		})
		
		let {level, XP} = Player;
	
		if (Player.UserId === Data.WinnerId) {
			if (XP + 120 >= (level + 1) * 200) {
			  XP = (XP + 120) - ((level + 1) * 200);
			  level += 1;
			} else {
			  XP += 120;
			}
		  } else {
			if (level === 0 && XP - 120 <= 0) {
			  XP = 0;
			} else {
			  if (XP - 120 >= 0) {
				XP -= 120;
			  } else if (level) {
				level -= 1;
				XP = ((level + 1) * 200) - (120 - XP);
			  }
			}
		  }

		await this.prisma.user.update({
			where : {
				UserId : Player.UserId,
			},
			data : {
				level : level,
				XP : XP,
			}
		})
	}

	async storeGame(User : User, Data : GameDto)
	{
		await this.GameSocket.handleEndgame(Data.PlayerId1);
		await this.GameSocket.handleEndgame(Data.PlayerId2);
		await this.calcullevel(User, Data.PlayerId1, Data);
		await this.calcullevel(User, Data.PlayerId2, Data);

		const game = await this.prisma.game.create({
			data : {
				PlayerId1 : Data.PlayerId1,
				PlayerId2 : Data.PlayerId2,
				WinnerId : Data.WinnerId,
				WinnerXP : Data.WinnerXP,
				looserXP : Data.looserXP,
				Mode : Data.Mode,
				Rounds : 1,
			}
		})

		await this.checkAchievement(Data.PlayerId1);
		await this.checkAchievement(Data.PlayerId2);
	}

	async checkAchievement(UserId : string)
	{
		const achievement = await this.prisma.achievement.findFirst({
			where : {UserId : UserId},
		})

		var PongPlayer = achievement.PongPlayer;
		var Helmchen = achievement.Helmchen;
		var Worldcup = achievement.Worldcup;
		var Batal = achievement.Batal;

		if (!achievement.Helmchen)
		{
			const HelmchenTest = await this.prisma.game.count({
				where : {
					WinnerId : UserId
				}
			});
		
			Helmchen = HelmchenTest === 10 ? true : false;
		}

		if (!achievement.Worldcup)
		{
			const WorldcupCheck = await this.prisma.game.count({
				where : {
					OR : [
						{PlayerId1 : UserId} , {PlayerId2 : UserId}
					],
					Mode : "football",
				}
			})
			Worldcup = WorldcupCheck === 7 ? true : false;
		}

		if (!achievement.PongPlayer)
		{
			const PongPlayerCheck = await this.prisma.game.count({
				where : {
					OR : [
						{PlayerId1 : UserId} , {PlayerId2 : UserId}
					],
				}
			})

			PongPlayer = PongPlayerCheck !== 0 ? true : false;
		}
		
		if (!Batal && achievement.PongPlayer)
		{
			const RankCheck = await this.prisma.user.findMany({
				orderBy: [
					{ level: 'desc' },
					{ XP: 'desc' },
					{ username : 'asc' }
				]
			});

			Batal = RankCheck[0].UserId === UserId ? true : false; 
		}

		await this.prisma.achievement.update({
			where : {
				UserId : UserId,
			},
			data : {
				PongPlayer : PongPlayer,
				Worldcup : Worldcup,
				Helmchen : Helmchen,
				Batal : Batal,
			}
		})
	}

	async blackhole(User : User)
	{
		await this.prisma.achievement.update({
			where :
			{
				UserId : User.UserId,
			},
			data : {
				Hawking : true,
			}
		})
	}

	async AI(User : User)
	{
		await this.prisma.achievement.update({
			where :
			{
				UserId : User.UserId,
			},
			data : {
				kasparov : true,
			}
		})
	}
}
