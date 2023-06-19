export type userType = {
	login: string;
	level: number;
	lastGame: string | null;
	avatar: string;
	points: number,
	status: boolean;
	admin: boolean;
	isFriend: boolean;
};
export type NotificationType = {
	id: number,
	avatar: String,
	text: String,
	isRead: boolean
}
export type MessageType = {
	id: number,
	from: String,
	to: String,
	message: String,
	date: Number,
	isLast: boolean
};
export type adminType = {
	login: string;
	level: number;
	lastGame: string | null;
	avatar: string;
	points: number,
};