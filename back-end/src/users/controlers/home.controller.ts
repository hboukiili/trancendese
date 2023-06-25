import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard.guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from '../dto/dto-classes'
import { HomeService } from '../services/home.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Home')
@ApiTags('Home')
@UseGuards(JwtAuthGuard)
export class HomeController {
    constructor(private readonly HomeService : HomeService){}

    @Get('Hero')
    GetHero(@Req() req, @Res() res) {
        res.json(req.user.username);
    }

    @Get('Best6Players')
    async getBestPlayers(@Req() req, @Res() res){
        const top6Players: topPlayers[] = await this.HomeService.Best6Players(req.user);
        res.json(top6Players);
    }

    @Get('MyProfile')
    async GetProfile(@Req() req, @Res() res){
        let lastGame = await this.HomeService.lastGame(req.user);
        res.json({
            lastGame : lastGame,
            avatar : req.user.avatar,
            username : req.user.username,
            level : req.user.level,
            badge : req.user.badge,
            status : req.user.status,           
        });
    }

    @Get('RecentActivity')
    async GetRecentActivity(@Req() req, @Res() res){
        const recent = await this.HomeService.RecentActivity(req.user);
        res.json(recent);
    }
}
