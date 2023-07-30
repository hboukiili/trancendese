import { Message } from "../entities/message.entity";

export class CreateMessageDto extends Message{

}


export class MessageDto{
    roomId : number;
    userId : string;
    Content : string;
}

