// import { Socket } from "socket.io";
// import { WebSocketAuthGuard } from "../auth-guard/WSjwt-guard";

// type SocketIOMIDDELWARE = {
//     (client : Socket, next: (err? : Error ) => void);
// }

// export const SocketIOMIDDELWARE = () : SocketIOMIDDELWARE => {
//     return (client, next) => {
//         try {
//             WebSocketAuthGuard.validate(client);
//             next(); 
//         } catch (error){
//             next (error);
//         }
//     }
// }