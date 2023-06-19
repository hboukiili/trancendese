import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard.guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from '../dto/dto-classes'

@Controller('Profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly UserService : UsersService){}

    @Get(':username/gamehistory')
    async getGameHistory(@Req() req, @Res() res, @Param('username') username : string)
	{	 
		const user = await this.UserService.ReturnOneUserByusername(username);
        let game : AllGames = await this.UserService.fetchgame(user);
        res.json(game.AllGames);
    }

    @Get(':username/profile')
    async getProfile(@Req() req, @Res() res, @Param('username') username : string){
        const user = await this.UserService.ReturnOneUserByusername(username);
        res.json({
            avatar 	 : user.avatar,
            status 	 : user.status,
            level  	 : user.level,
            xp       : user.XP,
            username : user.username,
        });
    }

	@Get(':username/Friends')
	async getFriends()
	{

	}
}
