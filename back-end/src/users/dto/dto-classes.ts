
export class UserDTO
{
    id 			: string;
    username 	: String;
    FULLNAME 	: String;
    avatar   	: String;
    XP       	: number;
	win			: number;
	loss		: number;
	draw		: number;
	level		: number;
	badge		: number;
	email		: string;
	createdAt	: Date	;
};

export class GamesDTO
{
	GameId				: string;
	Mode 				: string;
	won					: boolean;
	isDraw				: boolean;
	Rounds  			: number;
	advPic				: string;
	AdvName				: string;
	Winnerxp			: number;
	looserxp			: number;
}

export class AllGames
{
	win	 		: number;
	loose 		: number;
	Draw		: number;
	AllGames	: GamesDTO[];
}

export class topPlayers
{
	avatar 		: string;
	username 	: string;
	XP	 		: number;
	level 		: number;
}

export class RecentActivity
{
	Player1 		: string;
	Player1Avatar 	: string;
	Player2 		: string;
	Player2Avatar	: string;
	IsDraw  		: boolean;
	AreFriends        : boolean;
}

export class ProfileFriends
{
	friendshipId?	: number;
	avatar 	 		: string;
	username 		: string;
	sentInvitation 	: boolean;
	Accepted?		: boolean;
	UserId			: string;
	isOwner			: boolean;
}

export class blockedlist
{
	friendshipId 	: number;
	UserId 	 		: string;
	avatar 	 		: string;
	username 		: string;
}

export class setting
{
	avatar : string;
	username : string;
	email : string;
}

export class request
{
	avatar 	 : string;
	username : string;
	friendshipId : number;	
}

export class notification
{
	avatar : string;
	username : string;
	isRead : boolean;
	notificationId : number;
	Type : string;
}