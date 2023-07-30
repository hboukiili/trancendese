import { Body, ConsoleLogger, Controller, Get, NotFoundException, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from '../dto/dto-classes'
import { ProfileService } from '../services/profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';



@Controller('Profile')
@ApiTags('Profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly ProfileService : ProfileService){}

    @Get(':username/gamehistory')
    async getGameHistory(@Req() req, @Res() res, @Param('username') username : string)
	{	
		const user = await this.ProfileService.ReturnOneUserByusername(username);
    
		if (!user)
			throw new NotFoundException('User profile not found');
        let game : AllGames = await this.ProfileService.fetchgame(user, req.user);
        res.json(game);
    }

    @Get(':username/profile')
    async getProfile(@Req() req, @Res() res, @Param('username') username : string){
       
        const profile = await this.ProfileService.getProfile(req.user, username);
        res.json(profile);
    }

	@Get(':username/Friends')
	async getFriends(@Req() req, @Res() res, @Param('username') username : string)
	{
		const user = await this.ProfileService.ReturnOneUserByusername(username);
		if (!user)
			throw new NotFoundException('User profile not found');
		const friends = await this.ProfileService.userFriends(user, req.user);
		res.json(friends);
	}

    @Post('blockUser')
    @ApiBody({ 
        schema: {
          type: 'object',
          properties: {
            blockedUser: {
              type: 'string',
            },
          },
        },
    })
    async blockUser(@Req() req, @Body('blockedUser') username : string)
    {
        const user = await this.ProfileService.ReturnOneUserByusername(username);
        if (!user)
            throw new NotFoundException('User profile not found');
        const blocked = await this.ProfileService.blockUser(req.user, user);
    }

    @Get(":username/Activity")
    async getActivity(@Req() req, @Param('username') username : string, @Res() res)
    {
        const user = await this.ProfileService.ReturnOneUserByusername(username);
        if (!user)
            throw new NotFoundException('User profile not found');
        const Activity =  await this.ProfileService.getActivity(user);
        res.json(Activity);
    }

    @Get('Achievement')
    async GetAchievement(@Req() req)
    {
        return await this.ProfileService.getAchievement(req.user);
    }
}
 