import { ApiProperty } from "@nestjs/swagger";

export class GameDto
{
    @ApiProperty()
    PlayerId1 : string;
    @ApiProperty()
    PlayerId2 : string;
    @ApiProperty()
    WinnerId  : string;
    @ApiProperty()
    WinnerXP : number;
    @ApiProperty()
    looserXP : number;
    @ApiProperty()
    Mode     : string;
    @ApiProperty()
    Rounds   : number = 1;
}