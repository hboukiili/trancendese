import { Body, Controller, Get, ParseIntPipe, Patch, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard.guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from '../dto/dto-classes'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Request')
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

    @Post('CancelRequest')
    @ApiBody({ 
        schema: {
          type: 'object',
          properties: {
            FriendshipId: {
              type: 'number',
            },
          },
        },
    })
    async RemoveRequest(@Body('FriendshipId') friendshipId : number)
    {
        console.log(friendshipId);
        await this.UserService.cancelRequest(friendshipId);
    }

    @Get('blockedlist')
    async getBlockedlist(@Req() req)
    {
        const list = await this.UserService.getBlockedlist(req.user);
        return list;
    }

    // @Post('unblockUser')
    // async Unblock_user(@Req() req, @Body('username') user : string)
    // {
    //     const unblocked = await this.Unblock_user();
    // }

    @Get('Rank-Table')
	getRankTable()
    {
		
    }
}
