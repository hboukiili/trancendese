import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';
import { AddMemberDto, CreateRoomDto, CreateRoomwithMemebrs } from './dto/room.dto';
import { MessagesService } from "./messages.service";
import { MessageDto } from "./dto/create-message.dto";
import { JwtAuthGuard } from "src/auth/auth-guard/jwt-guard";
import { ApiTags } from "@nestjs/swagger";




@Controller('room')
@UseGuards(JwtAuthGuard)
@ApiTags('Chat')
export class RoomsController {
  constructor(private readonly messagesservice: MessagesService) { }


  @Post('/create')
  async createRoomAndMembership(@Body() createRoomWithMembers: CreateRoomwithMemebrs, @Req() req) {
    const { room } = createRoomWithMembers;

    const createdRoom = await this.messagesservice.createRoom(room);
    if (!createdRoom)
      return false;
    const createdMembership = await this.messagesservice.createMembership(
      createdRoom.RoomId,
      req.user.UserId);
    if (!createdMembership)
      return false;
    return true;
  }

    @Get(':roomId/RoomData')
    async RoomData(@Req() req, @Param('roomId', ParseIntPipe) roomId: number)
    {
        return await this.messagesservice.RoomData(req.user, roomId);
    }

  @Get(':roomId/messages/')
  async getMessagesByRoomId(@Param('roomId', ParseIntPipe) roomId: number) {
    const messages = await this.messagesservice.getMessage(roomId);
    return messages;
  }

  @Delete(':roomId/Delete')
  async deleteRoom(@Req() req, @Param('roomId', ParseIntPipe) roomId: number) {
    await this.messagesservice.deleteRoom(roomId, req.user.UserId);
    return { message: 'Room deleted successfully' };
  }

  //should be admin or owner
  @Delete(':roomId/kick/:userId')
  async kickUserFromRoom(@Req() req, @Param('roomId', ParseIntPipe) roomId: number, @Param('userId') userId: string,) {
    await this.messagesservice.kickFromRoom(roomId, userId, req.user.UserId);
    return { message: 'User Kicked' };
  }

  @Delete(':roomId/leave/:userId')
  async leaveRoom(@Req() req, @Param('roomId', ParseIntPipe) roomId: number, @Param('userId') userId: string,) {
    await this.messagesservice.leaveRoom(roomId, req.user.UserId);
    return { message: 'Leaved Room' };
  }


  //should be admin or owner
  @Post(':roomId/addmember')
  async addMemberToRoom(@Req() req, @Param('roomId', ParseIntPipe) roomId: number, @Body() addmemberdto: AddMemberDto) {
    const { userId } = addmemberdto;

    const createnewmember = await this.messagesservice.addMemberToRoom(roomId, userId, req.user.UserId);
    return {
      membership: createnewmember,
      message: 'Member added',
    };
  }
  //should be admin or owner
  @Post(':roomId/mute/:membershipid') //should impliment with socket
  async muteMember(@Req() req, @Param('membershipid', ParseIntPipe) membershipid: number, @Param('roomId', ParseIntPipe) roomId: number) {

    await this.messagesservice.muteMember(req.user.UserId, membershipid, roomId);

    return { message: 'Member muted' };
  };
  //should be admin or owner
  @Post(':roomId/ban/:membershipid') //should impliment with socket
  async BannedMember(@Req() req, @Param('membershipid', ParseIntPipe) membershipid: number, @Param('roomId', ParseIntPipe) roomId: number) {

    await this.messagesservice.BannedMember(req.user.UserId, membershipid, roomId);

    return { message: 'Member banned' };
  };

  @Post(':roomId/umute/:membershipid') // should impliment with socket 
  async ummuteMember(@Req() req, @Param('membershipid', ParseIntPipe) membershipid: number, @Param('roomId', ParseIntPipe) roomId: number) {

    await this.messagesservice.unmuteMember(req.user.UserId, membershipid, roomId);

    return { message: 'Member unmuted' };
  };
  //should be admin or owner
  @Post(':roomId/unban/:membershipid') //should impliment with socket
  async unBannedMember(@Req() req, @Param('membershipid', ParseIntPipe) membershipid: number, @Param('roomId', ParseIntPipe) roomId: number) {

    await this.messagesservice.unBannedMember(req.user.UserId, membershipid, roomId);

    return { message: 'Member unbanned' };
  };

  @Get('/rooms')
  async getRooms() {
   // const userId = req.user.UserId;
    const messages = await this.messagesservice.getRooms();
    const msg = messages.map(room => ({
      roomtype : room.Type,
      roomid: room.RoomId,
      name: room.RoomNAme,
      lastMessage: room.Message.length > 0 ? {
        content: room.Message[0].Content,
      } : null,
    }));
    return msg;
  }

  @Get('/dms')
  async getdms(@Req() req) {
    const userId = req.user.UserId;
    const messages = await this.messagesservice.getroomsdms(userId);
    const msg = messages.map(room => ({
      name: room.members[0].member.UserId === req.user.UserId ? room.members[1].member.username : room.members[0].member.username,
      avatar: room.members[0].member.UserId === req.user.UserId ? room.members[1].member.avatar : room.members[0].member.avatar,
      status: room.members[0].member.UserId === req.user.UserId ? room.members[1].member.status : room.members[0].member.status,
      userid: room.members[0].member.UserId === req.user.UserId ? room.members[1].member.UserId : room.members[0].member.UserId,
      roomid: room.RoomId,
      lastMessage: room.Message.length > 0 ? {
        content: room.Message[0].Content,
      } : null,
    }
    )
    );
    return msg;
  }


  @Post('joinroom/:roomId')
  async joinroom(@Req() req, @Param('roomId', ParseIntPipe) roomId: number, @Param('password') password: string) {
    const joinroom = await this.joinroom(req.user.UserId, roomId, password);
    if (!joinroom) {
      return { message: 'deja nta member or password incorrect' };
    }

    return {
      membership: joinroom,
      message: 'U re joined',
    };
  }

}