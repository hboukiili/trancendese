import { All, Injectable, Optional } from '@nestjs/common';
import { PrismaClient, User, Game, notificationType } from '@prisma/client';
import { GamesDTO, AllGames, topPlayers, RecentActivity, ProfileFriends } from '../dto/dto-classes';
import { create } from 'domain';
import { type } from 'os';
import { ProfileService } from './profile.service';

@Injectable()
export class HomeService {
    prisma = new PrismaClient();
	constructor(){}

	getBadge(level: number) {
		if (level < 5) {
		  return "bronze";
		} else if (level < 10) {
		  return "silver";
		} else if (level < 15) {
		  return "gold";
		} else if (level < 25) {
		  return "platinium";
		} else if (level < 40) {
		  return "diamond";
		} else if (level < 80) {
		  return "master";
		} else {
		  return "grandmaster";
		}
	}

	async getMyProfile(user : User)
	{
		const badge = await this.getBadge(user.level);

		let lastGame = await this.lastGame(user);

		return {
			lastGame : lastGame,
            avatar : user.avatar && user.avatar.search("https://cdn.intra.42.fr/users/") === -1
				&& !user.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + user.avatar
					: user.avatar,
            username : user.username,
            level : user.level,
            badge : badge,
			UserId : user.UserId,
            status : user.status,
		}

	}
	async getBlockeduserIds(user)
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

		const blockedUserIds = blockedUser.map(friendship =>
			friendship.SenderId === user ? friendship.ReceiverId : friendship.SenderId
		);
	
		return blockedUserIds;
	}

	async countGames(games, user, blockedUserIds)
	{
		const Draw = await this.prisma.game.count({
			where:{
				isDraw: true,
				OR: [
						{ 
							PlayerId1: user, 
							PlayerId2: { not: { in: blockedUserIds } },
						},
						{ 
							PlayerId2: user, 
							PlayerId1: { not: { in: blockedUserIds } },
						},
				  ],
			}
		});

		const win = await this.prisma.game.count({
			where:{
				WinnerId: user,
				OR: [
						{ 
							PlayerId1: user, 
							PlayerId2: { not: { in: blockedUserIds } },
						},
						{ 
							PlayerId2: user, 
							PlayerId1: { not: { in: blockedUserIds } },
						},
				],
			}
		});

		const loose = games.length - (win + Draw);

		return {
			loose,
			Draw,
			win
		};
	}

	async Allgames(user, blockedUserIds)
	{
		let games = await this.prisma.game.findMany({
			where: {
				OR: [
					{ 
					  PlayerId1: user, 
					  PlayerId2: { not: { in: blockedUserIds } },
					},
					{ 
					  PlayerId2: user, 
					  PlayerId1: { not: { in: blockedUserIds } },
					},
				  ],
			},
			orderBy:{
				CreationTime : "desc"
			}
		})
		return games;
	}

	async calculRating(user)
	{
		const block = await this.getBlockeduserIds(user);
		const games = await this.Allgames(user, block);
		const count = await this.countGames(games, user, block);
		const rating = (drawCount, lossCount, winCount) => {
			const totalGames = drawCount + lossCount + winCount;
			const winPercentage = winCount / totalGames;
			const rating = (winPercentage * 10).toFixed(1);
			return rating;
		  };
		  
		const playerRating = await rating(count.Draw, count.loose, count.win);

		return playerRating;
	}

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
			orderBy: [
				{ level: 'desc' },
				{ XP: 'desc' },
				{ username : 'asc' }
			  ]
		  });

		topPlayers = topPlayers.filter(user => !blockedUserIds.includes(user.UserId));
		const top = await Promise.all(topPlayers.map(async (player) => {
			player.avatar = player.avatar && player.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !player.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + player.avatar : player.avatar;
			const rating = await this.calculRating(player.UserId);
			var XP = player.XP;
			for (let i : number = 1; i < player.level + 1; i++)
				XP += (200 * i);
			return {
				rating,
				avatar: player.avatar,
				username: player.username,
				XP: XP,
				level: player.level,
			};
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

		  const isFriend = await this.prisma.friendship.findMany({
			where : {
				OR : [
					{
						SenderId : user.UserId,
					},
					{
						ReceiverId : user.UserId,
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
						username : true,
					}
				},
				receiver : {
					select : {
						username : true,
					}
				}
			},
		})


		const friends = isFriend.map(friend => {
			return friend.sender.username !== user.username ? friend.sender.username : friend.receiver.username;
		})

		const recently : RecentActivity[] = [];
		for (let i = 0; i < allgames.length; i++) {
			
			allgames[i].Player2.avatar = allgames[i].Player2.avatar && allgames[i].Player2.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !allgames[i].Player2.avatar.search('/uploads/') ? process.env.HOST + process.env.PORT + allgames[i].Player2.avatar : allgames[i].Player2.avatar;
			allgames[i].Player1.avatar = allgames[i].Player1.avatar && allgames[i].Player1.avatar.search("https://cdn.intra.42.fr/users/") === -1 && !allgames[i].Player1.avatar.search('/uploads/')? process.env.HOST + process.env.PORT + allgames[i].Player1.avatar : allgames[i].Player1.avatar;
			const check = friends.includes(allgames[i].Player2.username) && friends.includes(allgames[i].Player1.username);
			if (allgames[i].isDraw)
			{
				recently.push( {
					Player1 : allgames[i].Player2.username,
					Player1Avatar : allgames[i].Player2.avatar,
					Player2 : allgames[i].Player1.username,
					Player2Avatar : allgames[i].Player1.avatar,
					IsDraw : true,
					AreFriends : check,
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
					AreFriends : check,
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
					AreFriends : check,
				})
			}
		}
		return recently;
	}
}
