import { Injectable } from '@nestjs/common';
import { PrismaClient, User, } from '@prisma/client';
import { GamesDTO, ProfileFriends } from '../dto/dto-classes';
import { join } from 'path';
import { promises as fs } from 'fs';
import { ConflictException } from '@nestjs/common';



@Injectable()
export class ProfileService {
    prisma = new PrismaClient();
	constructor(){}

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

	async blockUser(user : User, targetUser : User)
	{
		var friend = await this.prisma.friendship.findFirst({
			where : {
				OR :[
					{
					SenderId : user.UserId, ReceiverId : targetUser.UserId
				},
				{
					SenderId : targetUser.UserId, ReceiverId : user.UserId,
				}
			]
			}
		})

		if (!friend)
		{
			friend = await this.prisma.friendship.create({
				data : {
					SenderId : user.UserId,
					ReceiverId : targetUser.UserId,
					blockedBySender : true,
				}
			})
			return friend;
		}
		if (friend.SenderId === user.UserId)
		{
			await this.prisma.friendship.update({
				where : {
					FriendshipId : friend.FriendshipId,
				},
				data : {
					blockedBySender : true,
					Accepted : false,
				}
			})
		}
		else
		{
			await this.prisma.friendship.update({
				where : {
					FriendshipId : friend.FriendshipId,
				},
				data : {
					blockedByReceiver : true,
					Accepted : false,
				}
			})
		}
	}
    
    async userFriends(user : User, authUser : User)
	{
		const friendsInfo = await this.prisma.friendship.findMany({
			where : {
				AND : [
					{
						OR: [{SenderId : user.UserId}, {ReceiverId : user.UserId}]
					},
				],
				blockedByReceiver : false,
				blockedBySender : false,
			},
			select : {
				Accepted : true,
				FriendshipId : true,
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
					],
					blockedByReceiver : false,
					blockedBySender : false,
				},
				select : {
					FriendshipId : true,
					Accepted : true,
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

			var friend2;
			const afriends = friendsInfo.map((friendship) => {
				const friend = friendship.sender.username === user.username ? friendship.receiver : friendship.sender;
					if (friend.username !== authUser.username)
					{
						const isMutual = friendsInfo2.some((friendship) => {
							friend2 = friendship.sender.UserId === authUser.UserId ? friendship.receiver : friendship.sender;
							if (friend.UserId === friend2.UserId)
								friend2.accepted = friendship.Accepted;
							return friend.UserId === friend2.UserId;
						});
						return {
							friendshipId : friendship.FriendshipId,
							UserId	: friend.UserId,
							avatar : friend.avatar,
							username : friend.username,
							Accepted : friend2.accepted,
							sentInvitation : isMutual,
							isOwner : false,
						}
					}
					else
					{
						friend2.accepted = friendship.Accepted;
						if (friend2.accepted)
							return {
								UserId	: friend.UserId,
								avatar : friend.avatar,
								username : friend.username,
								Accepted : true,
								sentInvitation : false,
								isOwner : true,
							}
					}
					
			}).filter((friend) => friend !== undefined);
			return afriends;
		}
		else if (user.UserId === authUser.UserId)
		{
			const friends : ProfileFriends[] = friendsInfo.map((friendsInfo) => {
				const check = friendsInfo.sender.UserId === user.UserId ? friendsInfo.receiver : friendsInfo.sender;
				if (friendsInfo.Accepted)
					return {
						friendshipId : friendsInfo.FriendshipId,
						UserId : check.UserId,
						avatar : check.avatar,
						username : check.username,
						sentInvitation : true,
						Accepted : true,
						isOwner : false,
					}
			}).filter((frienship) => frienship !== undefined);
			return friends;
		}
	}

    async checkisfriend(user : User)
	{
		const friend = await this.prisma.friendship.findMany({
			where :
			{
				AND : [
					{
						OR: [{SenderId : user.UserId}, {ReceiverId : user.UserId}]
					},
					{
						Accepted : true,
					}
				]
			},
			take : 1,
		});
		friend.filter((friend) => friend !== undefined);
		return friend.length ? true : false;
	}
    
	async isBlocked(user : User, AuthUser : User)
	{
		const isBlocked = await this.prisma.friendship.findFirst({
			where : {
				OR : [
					{
						SenderId : user.UserId, ReceiverId : AuthUser.UserId, blockedBySender : true,
					},
					{
						SenderId : user.UserId, ReceiverId : AuthUser.UserId, blockedByReceiver : true,
					},
					{
						SenderId : AuthUser.UserId, ReceiverId : user.UserId, blockedByReceiver : true,
					},
					{
						SenderId : AuthUser.UserId, ReceiverId : user.UserId, blockedBySender : true,
					}
				],
			}
		});
		return isBlocked === null;
	}

	async fetchgame(user : User)
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

		let games = await this.prisma.game.findMany({
			where: {
				OR: [
					{ 
					  PlayerId1: user.UserId, 
					  PlayerId2: { not: { in: blockedUserIds } },
					},
					{ 
					  PlayerId2: user.UserId, 
					  PlayerId1: { not: { in: blockedUserIds } },
					},
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
					{ 
					  PlayerId1: user.UserId, 
					  PlayerId2: { not: { in: blockedUserIds } },
					},
					{ 
					  PlayerId2: user.UserId, 
					  PlayerId1: { not: { in: blockedUserIds } },
					},
				  ],
			}
		});

		const win = await this.prisma.game.count({
			where:{
				WinnerId: user.UserId,
				OR: [
					{ 
					  PlayerId1: user.UserId, 
					  PlayerId2: { not: { in: blockedUserIds } },
					},
					{ 
					  PlayerId2: user.UserId, 
					  PlayerId1: { not: { in: blockedUserIds } },
					},
				],
			}
		});

		const loose = games.length - (win + Draw);

		let AllGames : GamesDTO [] = [];
		let isadv;
		for (let i = 0; i < games.length; i++){

			let { GameId, Mode, isDraw, Rounds, WinnerXP, looserXP } = games[i];

			let won = games[i].WinnerId == user.UserId ? true : false;

			isadv = games[i].PlayerId1 === user.UserId ? games[i].PlayerId2 : games[i].PlayerId1;
		
			let adv = await this.prisma.user.findUnique({
				where : {
					UserId : isadv,
				}
			});

			let Game: GamesDTO = {
				GameId: GameId.toString(),
				Mode: Mode,
				isDraw: isDraw,
				Rounds: Rounds,
				won: won,
				advPic : adv.avatar,
				AdvName: adv.username,
				Winnerxp : WinnerXP,
				looserxp : looserXP,
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

	async updatePhoto(file, UserId)
	{
		const filename = `${Date.now()}-${file.originalname}`;
        const path = join(__dirname, '../../../uploads', filename);
		console.log(path);
        await fs.writeFile(path, file.buffer);
		const pathPicture = process.env.HOST + process.env.PORT + '/uploads' + filename;
		const picture = await this.prisma.user.update({
			where: { UserId, },
			data : { avatar : pathPicture },
		})
		return true;
	}

	async updateUsername(newUsername : string, oldusername : string)
	{
		const exist = await this.prisma.user.findUnique({
			where : {username : newUsername},
		});

		if (exist)
			throw new ConflictException('Username is already in use');

		const picture = await this.prisma.user.update({
			where: { username : oldusername },
			data : { username : newUsername },
		})

		return true;
	}
}
