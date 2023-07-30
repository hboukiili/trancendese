import { Body, Controller, Get, ParseIntPipe, Patch, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from '../dto/dto-classes'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FriendshipService } from '../services/friendship.service';

@Controller('')
@ApiTags('friendship')
@UseGuards(JwtAuthGuard)
export class FriendshipController {
    constructor(private readonly FriendshipService : FriendshipService){}

    @Post('SendRequest')
    @ApiBody({ 
        schema: {
          type: 'object',
          properties: {
            receiverId: {
              type: 'string',
            },
          },
        },
    })
    async sendRequest(@Body('receiverId') receiver : string, @Req() req, @Res() res){
        const already = await this.FriendshipService.sendRequest(req.user, receiver);
        res.json(already);
    }

    @Post('AcceptRequest')
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
    async AcceptRequest(@Body('FriendshipId', new ParseIntPipe) FriendshipId : number, @Req() req){
        await this.FriendshipService.AcceptRequest(FriendshipId, req.user);
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
        await this.FriendshipService.cancelRequest(friendshipId);
    }

    @Get("FriendshipRequest")
    async getFriendshipRequest(@Req() req, @Res() res)
    {
        const request = await this.FriendshipService.getFriendshipRequest(req.user);
        res.json(request);
    }

    @Get('isRequest')
    async isRequest(@Req() req)
    {
        const request = await this.FriendshipService.getFriendshipRequest(req.user);
        return request.length ? true : false;
    }
}
