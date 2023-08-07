import './Game.scss'
import Table from './Table'
import Hk from '../../../../../assets/img/Hk.webp'
import GradienBox from '../../../../../tools/GradienBox'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import defaultAvatar from '../../../../../assets/img/avatar.png'
import emojiLose from '../../../../../assets/img/lose.svg'
import emojiWin from '../../../../../assets/img/win.svg'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../../../../Interceptor/Interceptor'
import OnlineMode from './Online'

function Game({ isBlackHole, isOnline, mode }: { isBlackHole: boolean, isOnline: boolean, mode: string }) {
    const admin = useSelector((state: any) => state.admin);
    const [leftscore, setLeftScore] = useState(0);
    const [rightscore, setRightScore] = useState(0);
    const { FriendsRoom } = useParams();
    const scoreL = Array.from({ length: Math.floor((isOnline ? leftscore : leftscore / 2)) }, (_, index) => (
        <div key={index + '-goal'} className="goal"></div>
    ));
    const scoreR = Array.from({ length: Math.floor((isOnline ? rightscore : rightscore / 2)) }, (_, index) => (
        <div key={index + '-goal'} className="goal"></div>
    ));
    useEffect(() => {
        const handleArrowKeys = (e: any) => {
            // Disable arrow key scrolling (left, right, up, down)
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                e.preventDefault();
            }
        };

        // Add the event listener when the component mounts
        window.addEventListener('keydown', handleArrowKeys);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleArrowKeys);
        };
    }, []);
    useEffect(() => {
        if (!isOnline) {
            setFound(true);
        }
    }, [])
    const token = useSelector((state: any) => state.token).token;
    const [isOne, setOne] = useState<boolean | null>(null);
    const FsetOne = () => {
        admin.UserId === Game.player1.id ? setOne(true) : setOne(false);
    }
    const [Game, setGame] = useState({
        player1: {
            avatar: '',
            username: '',
            id: '',
        },
        player2: {
            avatar: Hk,
            username: 'HK-47',
            id: '0',
        },
        mode: ''
    });

    const [isDone, setDone] = useState(false);
    const [isWin, setWin] = useState(false);
    useEffect(() => {
        if (Math.floor(isOnline ? leftscore : leftscore / 2) === 5 || Math.floor(isOnline ? rightscore : rightscore / 2) === 5) {
            setWin((Math.floor(isOnline ? leftscore : leftscore / 2)) === 5);
            setDone(true);
        }
    }, [leftscore, rightscore])
    const navigate = useNavigate();
    const [isFound, setFound] = useState<boolean>(false);
    useEffect(() => {
        if (isDone) {
            FsetOne();
        }
    }, [isDone])


    const [twoTime, setTwoTime] = useState(0);
    useEffect(() => {
        if (isOne && isDone && twoTime === 0) {
            const SendData = async () => {
                await axios.post('/game/StoreData', {
                    PlayerId1: Game.player1.id,
                    PlayerId2: Game.player2.id,
                    Mode: mode,
                    WinnerXP: 5,
                    looserXP: leftscore > rightscore ? rightscore : leftscore,
                    WinnerId: (isWin && isOne) ? Game.player1.id : (isWin && !isOne) ? Game.player2.id : (!isWin && isOne) ? Game.player2.id : Game.player1.id
                }
                )
            }
            SendData();
            setTwoTime(1);
        }

    }, [isOne])

    useEffect(() => {
        const postOffline = async () => {
            if (!isOnline && isWin) {
                if (isBlackHole)
                    await axios.post('/game/blackhole').catch((err) => console.log());
                else
                    await axios.post('/game/AI').catch((err) => console.log());
            }
        }
        postOffline();
    }, [isDone, isWin])
    return (
        <div style={{ position: 'relative' }} className='GameContainer'>
            <GradienBox mywidth="1201px" myheight="815px" myborder="40px">
                <div className="gameContent">
                    {isFound && <div className="gameHeader">
                        <div className="Player">
                            <img src={admin.avatar ? admin.avatar : defaultAvatar} />
                            <div className="scoreUser">
                                <p>{admin.username}</p>
                                <div className="score">
                                    {scoreL}
                                </div>
                            </div>
                        </div>
                        <div className="Player Player2">
                            <img src={(!isOnline ? (Game.player2.avatar ? Game.player2.avatar : defaultAvatar) : (admin.UserId !== Game.player1.id ? (Game.player1.avatar ? Game.player1.avatar : defaultAvatar) : (Game.player2.avatar ? Game.player2.avatar : defaultAvatar)))} />
                            <div className="scoreUser">
                                <p style={{ display: 'flex', flexDirection: 'row-reverse' }}>{(!isOnline ? Game.player2.username : (admin.UserId !== Game.player1.id ? Game.player1.username : Game.player2.username))}</p>
                                <div style={{ flexDirection: 'row-reverse' }} className="score">
                                    {scoreR}
                                </div>
                            </div>

                        </div>
                    </div>}
                    <div className="Tablecont">
                        <div className="TableC">
                            {!isOnline ? <Table isBlackHole={isBlackHole} leftscore={leftscore} setLeftScore={setLeftScore} rightscore={rightscore} setRightScore={setRightScore} /> :
                                <OnlineMode roomId={FriendsRoom} setDone={setDone} isFound={isFound} isOnline={isOnline} setFound={setFound} setGame={setGame} token={token} chosenMode={mode} leftscore={leftscore} rightscore={rightscore} setLeftScore={setLeftScore} setRightScore={setRightScore} />}
                        </div>
                    </div>
                </div>
            </GradienBox >
            {
                isDone &&
                <div className="gamePopup">
                    <div style={{ borderColor: (isWin ? '#25B2A4' : '#E15253') }} className={isWin ? "statusGame" : "statusGame lose"}>
                        <img style={{ width: '6.25rem', height: '6.25rem' }} className='emoji' src={(isWin ? emojiWin : emojiLose)} alt="" />
                        <h1>{(isWin ? 'WIN' : 'LOSE')}</h1>
                        <div style={{ borderColor: (isWin ? '#25B2A4' : '#E15253') }} className="vs">
                            <div className="player">
                                <img src={admin.avatar ? admin.avatar : defaultAvatar} alt="" />
                                <p>{admin.username}</p>
                            </div>
                            <div style={{ borderColor: (isWin ? '#25B2A4' : '#E15253') }} className="vsC">VS</div>
                            <div style={{ flexDirection: 'row-reverse' }} className="player">
                                <img src={(!isOnline ? (Game.player2.avatar ? Game.player2.avatar : defaultAvatar) : (admin.UserId !== Game.player1.id ? (Game.player1.avatar ? Game.player1.avatar : defaultAvatar) : (Game.player2.avatar ? Game.player2.avatar : defaultAvatar)))} alt="" />
                                <p>{(!isOnline ? Game.player2.username : (admin.UserId !== Game.player1.id ? Game.player1.username : Game.player2.username))}</p>
                            </div>
                        </div>
                        <div className="scoreN">
                            <div style={{ borderColor: (isWin ? '#25B2A4' : '#E15253') }} className="numberScore">{Math.floor(isOnline ? leftscore : leftscore / 2)}</div>
                            <div style={{ borderColor: (isWin ? '#25B2A4' : '#E15253') }} className="numberScore">{Math.floor(isOnline ? rightscore : rightscore / 2)}</div>
                        </div>
                        <div style={{ color: (isWin ? '#25B2A4' : '#E15253') }} className="pointsScore">{(isWin ? (isOnline ? '+ 120 Points' : '+ 0 Points') : (isOnline ? '- 120 Points' : '- 0 Points'))}</div>
                        <button onClick={() => {
                            navigate('/')
                        }} style={{ borderColor: (isWin ? '#25B2A4' : '#E15253') }} className='returnFromGame'>Return Home</button>
                    </div>
                </div>
            }

        </div >
    )
}
export default Game;