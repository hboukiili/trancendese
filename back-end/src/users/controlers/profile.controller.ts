import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard.guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from '../dto/dto-classes'

@Controller('Profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly UserService : UsersService){}

    @Get('gamehistory')
    async getGameHistory(@Req() req, @Res() res)
    {
        let game : AllGames = await this.UserService.fetchgame(req.user);
        res.json(game.AllGames);
    }

    @Get('profile')
    async getProfile(@Req() req, @Res() res){
        const user = await this.UserService.ReturnOneUser(req.user);
        res.json({
            avatar 	 : req.user.avatar,
            status 	 : req.user.status,
            level  	 : req.user.level,
            xp       : req.user.xp,
            username : req.user.username,
        });
    }

	@Get('Friends')
	async getFriends()
	{

	}
}
