import { All, Injectable } from '@nestjs/common';
import { PrismaClient, User, Game } from '@prisma/client';
import { GamesDTO, AllGames, topPlayers, RecentActivity, ProfileFriends } from '../dto/dto-classes';

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

	async ReturnOneUserByusername(username : string){
		const findUser = await this.prisma.user.findUnique({
			where: {
				username,
			},
		});
		if (!findUser){
			return findUser;
		}
		return findUser;
    }

	async sendRequest(User : User, receiverId : string)
	{
		const friendshipRequest = await this.prisma.friendship.create({
			data: {
			  sender: {
				connect: { UserId: User.UserId }
			  },
			  receiver: {
				connect: { UserId: receiverId }
			  },
			}
		  });
	}

	async userFriends(user : User, authUser : User)
	{
		const friendsInfo = await this.prisma.friendship.findMany({
			where : {
				AND : [
					{
						OR: [{SenderId : user.UserId}, {ReceiverId : user.UserId}]
					},
					{
						Accepted : true,
					}
				]
			},
			select : {
				sender : {
					select : {
						avatar : true,
						username : true,
						UserId : true,
					}
				},
				receiver : {
					select : {
						avatar : true,
						username : true,
						UserId : true,
					}
				}
			}
		});
			
		if (user.UserId !== authUser.UserId)
		{
			let friendsInfo2 = await this.prisma.friendship.findMany({
				where : {
					AND : [
						{
							OR: [{SenderId : authUser.UserId}, {ReceiverId : authUser.UserId}]
						},
						{
							Accepted : true,
						}
					]
				},
				select : {
					sender : {
						select : {
							avatar : true,
							username : true,
							UserId : true,
						}
					},
					receiver : {
						select : {
							avatar : true,
							username : true,
							UserId : true,
						}
					}
				}

			});

			const afriends = friendsInfo.map((friendship) => {
				const friend = friendship.sender.username === user.username ? friendship.receiver : friendship.sender;
					if (friend.username !== authUser.username)
					{
						const isMutual = friendsInfo2.some((friendship) => {
							var friend2 = friendship.sender.UserId === authUser.UserId ? friendship.receiver : friendship.sender;
							return friend.UserId === friend2.UserId;
						});	
						return {
							UserId	: friend.UserId,
							avatar : friend.avatar,
							username : friend.username,
							isMUtualFriend : isMutual,
						}
					}
					
			}).filter((friend) => friend !== undefined);
			return afriends;
		}
		else if (user.UserId === authUser.UserId)
		{
			const friends : ProfileFriends[] = friendsInfo.map((friendsInfo) => {
				const check = friendsInfo.sender.UserId === user.UserId ? friendsInfo.receiver : friendsInfo.sender;
				return {
					UserId : check.UserId,
					avatar : check.avatar,
					username : check.username,
					isMUtualFriend : true,
				}
			});
			return friends;
		}
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
