import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers, notification} from '../dto/dto-classes'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('user')
export class UsersController {
    constructor(private readonly UserService : UsersService){}

	@Get('getNotification')
	@UseGuards(JwtAuthGuard)
	async getNotification(@Req() req)
	{
		return await this.UserService.getNotification(req.user);
	}

	@Post('search')
	@ApiBody({ 
		schema: {
			type: 'object',
			properties: {
			user: {
				type: 'string',
			},
			},
		},
	})
	@UseGuards(JwtAuthGuard)
	async search(@Req() req, @Body("user") user : string, @Res() res)
	{
		const allusers = await this.UserService.getallUsers(req.user, user);
		res.json(allusers);
	}

	@Post("ReadNotification")
	@ApiBody({ 
		schema: {
			type: 'object',
			properties: {
			notificationId: {
				type: "number",
			},
			},
		},
	})
	@UseGuards(JwtAuthGuard)
	async ReadNotification(@Body("notificationId") notificationId : number, @Req() req, )
	{
		await this.UserService.ReadNotification(notificationId, req.user);
	}

	@Post("readallnotification")
	@UseGuards(JwtAuthGuard)
	async ReadAllNotification(@Req() req)
	{
		return await this.UserService.ReadallNotification(req.user);
	}

	
    @Get('')
    async wsToken()
    {
        return true;
    }

	@Get('noticationState')
	@UseGuards(JwtAuthGuard)
	async notificationState(@Req() req)
	{
		return await this.UserService.notificationState(req.user);
	}

	@Post('GameInvitation')
	@UseGuards(JwtAuthGuard)
	async SendGameInvitaion(@Req() req, @Body('receiver') receiver : string)
	{
		await this.UserService.sendGameInvitaion(receiver, req.user);
	}
}
