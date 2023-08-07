import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto{
    @ApiProperty()
    name : string;
    password? : string;
    @ApiProperty()
    type : string;
}

export class CreateMembershipDto{
//    @ApiProperty()
//    IsBanned :  boolean;
//    @ApiProperty()
//    IsMuted : boolean;
}

export class CreateRoomwithMemebrs{
    @ApiProperty()
    room: CreateRoomDto;
}

export class AddMemberDto{
    @ApiProperty()
    username: string;
}

export class JoinroomDto{
    @ApiProperty()
    password:string;
}
