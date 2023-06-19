import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard.guard';
import { UsersService } from './services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from './dto/dto-classes'
@Controller('')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly UserService : UsersService){}

    @Get('Hero')
    GetHero(@Req() req, @Res() res) {
        res.json(req.user.username);
    }

    @Get('MyProfile')
    async GetProfile(@Req() req, @Res() res){
        let lastGame = await this.UserService.lastGame(req.user);
        res.json({
            lastGame : lastGame,
            avatar : req.user.avatar,
            username : req.user.username,
            level : req.user.level,
            badge : req.user.badge,
            status : false,           
        });
    }

    @Get('Best6Players')
    async getBestPlayers(@Req() req, @Res() res){
        const top6Players: topPlayers[] = await this.UserService.Best6Players(req.user);
        res.json(top6Players);
    }

    @Get('profile')
    async getProfile(@Req() req, @Res() res){
        const user = await this.UserService.ReturnOneUser(req.user);
        res.json(user);
    }

    @Get('gamehistory')
    async getGameHistory(@Req() req, @Res() res)
    {
        let game : AllGames = await this.UserService.fetchgame(req.user);
        console.log(game.AllGames[0].advPic);
        res.json(game.AllGames[0].advPic);
    }

    @Get('RecentActivity')
    GetRecentActivity(@Req() req, @Res() res){
        this.UserService.RecentActivity();
        res.json('okk');
    }
}
