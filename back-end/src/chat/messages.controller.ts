import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import {
	AddMemberDto,
	CreateRoomDto,
	CreateRoomwithMemebrs,
} from "./dto/room.dto";
import { MessagesService } from "./messages.service";
import { MessageDto } from "./dto/create-message.dto";
import { JwtAuthGuard } from "src/auth/auth-guard/jwt-guard";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Cron } from "@nestjs/schedule";

@Controller("room")
@UseGuards(JwtAuthGuard)
@ApiTags("Chat")
export class RoomsController {
	constructor(private readonly messagesservice: MessagesService) { }

	@Post("/create")
	async createRoomAndMembership(
		@Body() createRoomWithMembers: CreateRoomwithMemebrs,
		@Req() req
	) {
		const { room } = createRoomWithMembers;

		const createdRoom = await this.messagesservice.createRoom(room);
		if (!createdRoom) return false;
		const createdMembership = await this.messagesservice.createMembership(
			createdRoom.RoomId,
			req.user.UserId
		);
		if (!createdMembership) return false;
		return true;
	}

	@Get(":roomId/RoomData")
	async RoomData(@Req() req, @Param("roomId", ParseIntPipe) roomId: number) {
		return await this.messagesservice.RoomData(req.user, roomId);
	}

	@Get(":roomId/messages/")
	async getMessagesByRoomId(
		@Param("roomId", ParseIntPipe) roomId: number,
		@Req() req
	) {
		const messages = await this.messagesservice.getMessage(roomId, req.user);
		return messages;
	}

	@Delete(":roomId/Delete")
	async deleteRoom(@Req() req, @Param("roomId", ParseIntPipe) roomId: number, @Res() res) {
		await this.messagesservice.deleteRoom(roomId, req.user.UserId);
		res.redirect(process.env.FrontIp + '/chat');
		res.json(true);
	}

	//should be admin or owner
	@Delete(":roomId/kick/:userId")
	async kickUserFromRoom(
		@Req() req,
		@Param("roomId", ParseIntPipe) roomId: number,
		@Param("userId") userId: string
	) {
		await this.messagesservice.kickFromRoom(roomId, userId, req.user.UserId);
		return { message: "User Kicked" };
	}

	@Delete(":roomId/leave/:userId")
	async leaveRoom(
		@Req() req,
		@Param("roomId", ParseIntPipe) roomId: number,
		@Param("userId") userId: string
	) {
		await this.messagesservice.leaveRoom(roomId, req.user.UserId);
		return { message: "Leaved Room" };
	}

	//should be admin or owner
	@Post(":roomId/addmember")
	async addMemberToRoom(
		@Req() req,
		@Param("roomId", ParseIntPipe) roomId: number,
		@Body() addmemberdto: AddMemberDto
	) {
		const { username } = addmemberdto;

		const createnewmember = await this.messagesservice.addMemberToRoom(
			roomId,
			username,
			req.user.UserId
		);
		return true;
	}
	//should be admin or owner
	@Post(":roomId/mute/:membershipid") //should impliment with socket
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				time: {
					type: "string",
				},
			},
		},
	})

	async muteMember(
		@Req() req,
		@Param("membershipid", ParseIntPipe) membershipid: number,
		@Param("roomId", ParseIntPipe) roomId: number,
		@Body("time", ParseIntPipe) time: number
	) {
		await this.messagesservice.muteMember(
			req.user.UserId,
			membershipid,
			roomId,
			time
		);

		return { message: "Member muted" };
	}

	//should be admin or owner
	@Post(":roomId/ban/:membershipid") //should impliment with socket
	async BannedMember(
		@Req() req,
		@Param("membershipid", ParseIntPipe) membershipid: number,
		@Param("roomId", ParseIntPipe) roomId: number
	) {

		await this.messagesservice.BannedMember(
			req.user.UserId,
			membershipid,
			roomId
		);

		return { message: "Member banned" };
	}

	@Post(":roomId/umute/:membershipid") // should impliment with socket
	async ummuteMember(
		@Req() req,
		@Param("membershipid", ParseIntPipe) membershipid: number,
		@Param("roomId", ParseIntPipe) roomId: number
	) {
		await this.messagesservice.unmuteMember(
			req.user.UserId,
			membershipid,
			roomId
		);

		return { message: "Member unmuted" };
	}
	//should be admin or owner
	@Post(":roomId/unban/:membershipid") //should impliment with socket
	async unBannedMember(
		@Req() req,
		@Param("membershipid", ParseIntPipe) membershipid: number,
		@Param("roomId", ParseIntPipe) roomId: number
	) {
		await this.messagesservice.unBannedMember(
			req.user.UserId,
			membershipid,
			roomId
		);

		return { message: "Member unbanned" };
	}

	@Post(":roomId/setAdmin/:membershipid")
	async setAdmin(
		@Req() req,
		@Param("membershipid", ParseIntPipe) membershipid: number,
		@Param("roomId", ParseIntPipe) roomId: number
	) {
		return await this.messagesservice.setAdmin(membershipid, req.user, roomId);
	}

	@Get("/rooms")
	async getRooms(@Req() req) {
		const userId = req.user.UserId;
		const rooms = await this.messagesservice.getRooms(userId);

		const msg = rooms.map((room) => ({
			type: room.Type,
			name: room.RoomNAme,
			roomid: room.RoomId,
			lastMessage:
				room.Message.length > 0
					? {
						content: room.Message[0].Content,
					}
					: null,
		}));
		return msg;
	}

	@Get("/dms")
	async getdms(@Req() req) {
		const userId = req.user.UserId;
		const messages = await this.messagesservice.getroomsdms(userId);
		const msg = messages.map((room) => {
			let check = {
				name:
					room.members[0].member.UserId === req.user.UserId
						? room.members[1].member.username
						: room.members[0].member.username,
				avatar:
					room.members[0].member.UserId === req.user.UserId
						? room.members[1].member.avatar
						: room.members[0].member.avatar,
				status:
					room.members[0].member.UserId === req.user.UserId
						? room.members[1].member.status
						: room.members[0].member.status,
				userid:
					room.members[0].member.UserId === req.user.UserId
						? room.members[1].member.UserId
						: room.members[0].member.UserId,
				roomid: room.RoomId,
				lastMessage:
					room.Message.length > 0
						? {
							content: room.Message[0].Content,
						}
						: null,
			};
			check.avatar =
				check.avatar && check.avatar.search("https://cdn.intra.42.fr/users/") === -1 &&
					!check.avatar.search("/uploads/")
					? process.env.HOST + process.env.PORT + check.avatar
					: check.avatar;
			return check;
		});
		return msg;
	}

	@Post("checkmember/:roomId")
	async checkismember(
		@Req() req,
		@Param("roomId", ParseIntPipe) roomId: number
	) {
		const userId = req.user.UserId;
		const checkroomsmember = await this.messagesservice.checkmembership(
			roomId,
			userId
		);
		return checkroomsmember;
	}

	@Post(":roomId/joinroom")
	async joinroom(
		@Req() req,
		@Param("roomId", ParseIntPipe) roomId: number,
		@Body("password") password: string
	) {
		const joinroom = await this.messagesservice.joinroom(
			req.user.UserId,
			roomId,
			password
		);
		if (!joinroom)
			return {
				message:
					"You are already a member of this room or the room was not found",
				is: false,
			};
		if (
			"message" in joinroom &&
			joinroom["message"] === "Password is incorrect"
		) {
			return { message: "Password is incorrect", is: false };
		}

		return {
			is: true,
			membership: joinroom,
			message: "U re joined",
		};
	}

	@Get(":roomId/getdetails")
	async getroomdetails(
		@Param("roomId", ParseIntPipe) roomId: number,
		@Req() req
	) {
		const getroomdetails = await this.messagesservice.getroomdetails(
			roomId,
			req.user
		);
		return getroomdetails;
	}

	@Cron("* * * * *")
	async handleCron() {
		await this.messagesservice.unmuteUsers();
	}

	@Post(":roomId/setpassword")
	async setpassword(
		@Req() req,
		@Param("roomId", ParseIntPipe) roomId: number,
		@Body("password") password: string
	) {
		const setpassword = await this.messagesservice.setpassword(
			req.user.UserId,
			roomId,
			password
		);
		return setpassword;
	}

	@Post(":roomId/removepassword")
	async removepassword(
		@Req() req,
		@Param("roomId", ParseIntPipe) roomId: number,
		@Body("password") password: string) {
		const removepassword = await this.messagesservice.removepassword(
			req.user.UserId,
			roomId,
			password
		);
		if (!removepassword) {
			return { message: "password incorrect", is: false };
		}
		return removepassword;
	}

	@Post(":roomId/updatepassword")
	async updatepassword(
		@Req() req,
		@Param("roomId", ParseIntPipe) roomId: number,
		@Body("oldpassword") oldpassword: string,
		@Body("password") password: string) {
		const updatepassword = await this.messagesservice.updatepassword(
			req.user.UserId,
			roomId,
			oldpassword,
			password
		);
		if (!updatepassword) {
			return false;
		}
		return updatepassword;
	}
}
