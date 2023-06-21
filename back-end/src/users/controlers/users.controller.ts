import { Body, Controller, Get, ParseIntPipe, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard.guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from '../dto/dto-classes'
@Controller('')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly UserService : UsersService){}

    @Post('SendRequest')
    async sendRequest(@Body('receiverId') receiver : string, @Req() req, @Res() res){
        const already = await this.UserService.sendRequest(req.user, receiver);
        res.json(already);
    }

    @Post('AcceptRequest')
    async AcceptRequest(@Body('requestId', new ParseIntPipe) FriendshipId : number){
        await this.UserService.AcceptRequest(FriendshipId);
        return true;
    }
}
