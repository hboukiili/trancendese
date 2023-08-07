import React, { useEffect, useState } from 'react';
import './Game.scss'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom';

function removeDecimalPart(number: number): number {
    return Math.floor(number);
}

function App({roomId, setDone, isFound, isOnline, token, setGame, setFound, chosenMode, leftscore, rightscore, setLeftScore, setRightScore }: {roomId:string | undefined, setDone:any, isFound: any, isOnline: any, token: any, setGame: any, setFound: any, chosenMode: string, leftscore: number, rightscore: number, setLeftScore: any, setRightScore: any }) {
    const [firstPaddlePos, setFirstPaddlePos] = React.useState(0);
    const movePaddle = React.useRef(0);
    const [secondPaddlePos, setSecondPaddlePos] = React.useState(0);
    const [gameOver, setGameOver] = React.useState(false);
    const [isGameReady, setIsGameReady] = React.useState(false);
    const [message, setMessage] = React.useState('Waiting for a player...');
    let paddlepos1: number;
    const [roomid, setRoomid] = React.useState<any>();
    let [isSecondPlayer, setIsPlayer] = React.useState<number>(1);

    const Score = ({ leftScore, rightScore, lColor, rColor }: { leftScore: number; rightScore: number, lColor: string, rColor: string }) => {
        const leftScoreStyle: React.CSSProperties = {
            position: 'absolute',
            left: '15%',
            top: '0',
            textAlign: 'center',
            color: `${lColor}`,
            fontSize: '30rem',
            paddingTop: '5%',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1,
            opacity: '0.3',
        };

        const rightScoreStyle: React.CSSProperties = {
            position: 'absolute',
            right: '15%',
            top: '0',
            textAlign: 'center',
            color: `${rColor}`,
            fontSize: '30rem',
            paddingTop: '5%',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1,
            opacity: '0.3',
        };

        return (
            <>
                <div style={leftScoreStyle}>
                    {leftScore}
                </div>
                <div style={rightScoreStyle}>
                    {rightScore}
                </div>
            </>
        );
    };

    const Ball = ({ ballPos }: { ballPos: any }) => {


        const ballStyle: React.CSSProperties = {
            width: '1.5625rem', // 25px
            height: '1.5625rem', // 25px
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'relative',
            left: `${ballPos.x}rem`,
            top: `${ballPos.y}rem`,
            boxShadow: '0 0 1.25rem white' // 20px
        };


        return <div style={ballStyle}></div>;
    };

    const Paddle = ({ color, pos }: { color: string; pos: string }) => {
        const paddleStyle: React.CSSProperties = {
            width: '1.375rem', // 22px
            height: '6.625rem', // 106px
            backgroundColor: color,
            position: 'relative',
            top: pos,
            boxShadow: `0 0 1.25rem ${color}`, // 20px
            borderRadius: '1.25rem', // 20px
            marginInline: '1.25rem', // 20px
            zIndex: 6,
        };

        return <div style={paddleStyle}></div>;
    };


    const [gameMode, setGameMode] = React.useState<null | 'classic' | 'football' | 'friends'>(null);

    const [ballPos, setBallPos] = React.useState({ x: 0, y: 0 });
    React.useEffect(() => {
        if (gameMode && Socket) {
            if(gameMode === 'friends')
                Socket.emit('friends', roomId );
            else
                Socket.emit('gameMode', gameMode );
        }
    }, [gameMode]);
    const [leftcolor, setLColor] = React.useState('#E15253')
    const [rightcolor, setRColor] = React.useState('#E15253');

    React.useEffect(() => {
        if (chosenMode === "classic" || chosenMode === "friends") {
            setLColor("#E15253");
            setRColor("#5699AF");
        }
        else if (chosenMode === "football") {
            setLColor("white");
            setRColor("white");
        }

    }, []);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'w') {
            movePaddle.current = -0.2;
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            movePaddle.current = 0.2;
        }
    };

    const handleKeyUp = () => {
        movePaddle.current = 0; // 7bess
    };

    React.useEffect(() => {
        const updatePaddlePosition = () => {
            if (!gameOver) {
                setFirstPaddlePos((prev) => {
                    const newPosition = prev + movePaddle.current;
                    let maxPos = 17.5;
                    let minPos = -17.187;
                    if (chosenMode === "football") {
                        maxPos = 10;
                        minPos = -10;
                    }

                    paddlepos1 = (Math.min(Math.max(newPosition, minPos), maxPos));
                    return paddlepos1;
                });

                requestAnimationFrame(updatePaddlePosition);
            }
        };

        if (!gameOver) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            requestAnimationFrame(updatePaddlePosition);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (Socket)
            Socket.emit('paddlemove', { room: roomid, pos: firstPaddlePos, SecondPlayer: isSecondPlayer });
    }, [firstPaddlePos])

    const [Socket, setSocket] = useState<any | null>(null)
    React.useEffect(() => {
        if (Socket) {
            Socket.on('connect', () => {
            });
            Socket.emit('gameMode', chosenMode);
            Socket.on('GamesInfo', (data: any) => {
                if (data === null) {
                    setMessage('You are already in a GAME!');
                }
                else {
                    setGame({
                        player1: {
                            avatar: data.Player1Avatar,
                            username: data.Player1Username,
                            id: data.Player1Id,
                        },
                        player2: {
                            avatar: data.Player2Avatar,
                            username: data.Player2Username,
                            id: data.Player2Id,
                        },
                        mode: data.gameMode
                    });
                    setFound(true);
                }

            });
            Socket.on('startgame', ({ room, SecondPlayer }: { room: any, SecondPlayer: any }) => {
                setIsPlayer(SecondPlayer);
                if (chosenMode === "classic" || chosenMode === "friends") {
                    setLColor("#E15253");
                    setRColor("#5699AF");
                }
                else if (chosenMode === "football") {
                    setLColor("white");
                    setRColor("white");
                }
                setIsGameReady(true);
                setRoomid(room);
            });
            Socket.on('disconnect', () => {
            });
            Socket.on('leftscored', () => {
                setLeftScore((prevScore: number) => {
                    const newScore = prevScore + 1;
                    if (removeDecimalPart(newScore) === 5) {
                        setGameOver(true);
                        Socket.emit('gameended', { room: roomid });
                    }
                    return newScore;
                });
            });
            Socket.on('rightscored', () => {
                setRightScore((prevScore: number) => {
                    const newScore = prevScore + 1;
                    if (removeDecimalPart(newScore) === 5) {
                        setGameOver(true);
                        Socket.emit('gameended');
                    }
                    return newScore;
                });
            });
            Socket.on('ballmove', function (newPosition: any) {
                setBallPos(isSecondPlayer === 2 ? { x: -newPosition.x, y: newPosition.y } : newPosition);
            });
            Socket.on('startgame', ({ room, SecondPlayer }: { room: any, SecondPlayer: any }) => {
                isSecondPlayer = SecondPlayer;
                setIsGameReady(true);
                setRoomid(room);
            });
            Socket.on('paddlemove', function (newPosition: any) {
                setSecondPaddlePos(newPosition);
            });
            return () => {
                Socket.disconnect();
            };
        }
    }, [Socket]);

    React.useEffect(() => {
        if (isOnline && token && !Socket) {
            const socket = io(`${import.meta.env.VITE_URL + import.meta.env.VITE_PORT}/socket.io/game`, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setSocket(socket);
        }
    }, []);

    useEffect(()=>{
        if (!isFound)
            setTimeout(() => { setMessage('Sorry!! try again, next time...') }, 60000);
        // 60000 == 1min
    },[])
    useEffect(() => {
        if (gameOver) {
            Socket.disconnect();
            setDone(true);
            
        }
    }, [gameOver])
    const navigate = useNavigate();
    return (
        <div className={`table-${chosenMode}`}>
            {
                !isFound &&
                <div className="Found">
                    <div className="blockss">
                        <div className="block orange"></div>
                        <div className="block blue"></div>
                    </div>
                    <h1 style={{ color: '#F9C690' }}>{message}</h1>
                    <div className="ctnBtn">
                        {
                            message !== 'Waiting for a player...' &&
                            <button onClick={() => {
                                navigate('/')
                            }} className='returnFromGame'>Return Home</button>
                        }
                    </div>

                </div>
            }
            {(!gameOver && isFound) && <Paddle color="#E15253" pos={`${firstPaddlePos}rem`} />}
            {(!gameOver && isFound) && <Ball ballPos={ballPos} />}
            {(!gameOver && isFound) && <Paddle color="#5699AF" pos={`${secondPaddlePos}rem`} />}
            {isFound && <Score leftScore={removeDecimalPart(leftscore)} rightScore={removeDecimalPart(rightscore)} lColor={leftcolor} rColor={rightcolor} />}
            <div className="lineC">
                <div className="line"></div>
            </div>
        </div>
    );
}

export default App;