import { Body, ConsoleLogger, Controller, Get, NotFoundException, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard.guard';
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
        let game : AllGames = await this.ProfileService.fetchgame(user);
        res.json(game);
    }

    @Get(':username/profile')
    async getProfile(@Req() req, @Res() res, @Param('username') username : string){
        // var blocked;
        const user = await this.ProfileService.ReturnOneUserByusername(username);
        // if (user.UserId !== req.user.UserId)
        //     blocked = await this.ProfileService.isBlocked(user, req.user);
		// if (blocked || !user)
		// 	throw new NotFoundException('User profile not found');
        const Isowner = user.username === req.user.username;
        let isFriend = false;
        if (!Isowner)
            isFriend = await this.ProfileService.checkisfriend(user);
        res.json({
            avatar 	 : user.avatar,
            status 	 : user.status,
            level  	 : user.level,
            xp       : user.XP,
            username : user.username,
            Isowner,
            isFriend,
        });
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

    @Post(':username/UpdatePicture')
    @UseInterceptors(FileInterceptor('file'))
    async UpdateProfile(@UploadedFile() file, @Param('username') username: string, @Req() req)
    {
        return await this.ProfileService.updatePhoto(file, username);
    }

    @Patch(':username/updateUsername')
    async updateUsername(@Body('username') newUsername: string, @Param('username') oldusername : string, @Req() req)
    {
        if (req.user.username === newUsername)
            throw new Error('No changes has been made');
        return await this.ProfileService.updateUsername(newUsername, oldusername);
    }
    
    @Post('blockUser')
    @Post('CancelRequest')
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
        if (user.UserId == req.user.UserId)
            throw new Error('can not block this user')
        const blocked = await this.ProfileService.blockUser(req.user, user);
    }
}
