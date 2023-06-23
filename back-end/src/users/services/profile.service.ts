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
    
    async userFriends(user : User, authUser : User)
	{
		const friendsInfo = await this.prisma.friendship.findMany({
			where : {
				AND : [
					{
						OR: [{SenderId : user.UserId}, {ReceiverId : user.UserId}]
					},
				]
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
					]
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
							console.log(friendsInfo2);
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
						return {
							UserId	: friend.UserId,
							avatar : friend.avatar,
							username : friend.username,
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

	async updatePhoto(file, username)
	{
		const filename = `${Date.now()}-${file.originalname}`;
        const path = join(__dirname, '../../../uploads', filename);
		console.log(path);
        await fs.writeFile(path, file.buffer);
		const picture = await this.prisma.user.update({
			where: { username, },
			data : { avatar : path },
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
