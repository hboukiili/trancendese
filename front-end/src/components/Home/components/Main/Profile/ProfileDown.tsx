import batal from '../../../../../assets/img/Achivement/Batal.png'
import hawking from '../../../../../assets/img/Achivement/Hawking.png'
import helmchen from '../../../../../assets/img/Achivement/Helmchen.png'
import worldCup from '../../../../../assets/img/Achivement/World Cup.png'
import kasparov from '../../../../../assets/img/Achivement/Kasparov.png'
import extrovert from '../../../../../assets/img/Achivement/EXTROVERT.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
import defaultAvatar from '../../../../../assets/img/avatar.png'
import axios from '../../../../../Interceptor/Interceptor'
import GradienBox from '../../../../../tools/GradienBox'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

type ProfileRightType = {
    avatar: string;
    status: boolean;
    level: number;
    xp: number;
    username: string;
    isOwner: boolean;
    UserId: string;
    isFriend: boolean;
    friendshipId: number;
    isSent: boolean;
    rank: number;
    rating: string | undefined;

}
function TheGame(props: any) {
    return (
        <div className="firstLayer">
            <div className="secondLayer">
                <div className={props.theGame === 'win' ? "gameSta winGame" :
                    props.theGame === 'lose' ? 'gameSta loseGame' : 'gameSta'}>
                    <div className="infoGame">
                        <Link to={`/profile/${props.login}`}>
                            <img src={props.avatar ? props.avatar : defaultAvatar} onError={(e: any) => {
                                e.target.src = defaultAvatar;
                            }
                            } alt="Enemey" />
                        </Link>
                        <div className="enemyScore">
                            <h1>{props.login}</h1>
                            <div className="score">
                                <h1 className='Goal Win'>{props.winner}</h1>
                                <div className="Goal Win">|</div>
                                <h1 className='Goal Lose'>{props.loser}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="xpGame">
                        <h1>{props.theGame === 'win' ? "+120pts" :
                            props.theGame === 'lose' ? '-120pts' : '+60pts'}</h1>
                        <h1 className='modeGame'>{props.mode}</h1>
                    </div>
                </div>
            </div>
        </div>

    );
}

type Archivement = {
    title: string;
    img: string;
}



type GamesDTO =
    {
        GameId: string;
        Mode: string;
        Result: number;
        won: boolean;
        isDraw: boolean;
        Rounds: number;
        advPic: string;
        AdvName: string;
        Winnerxp: number;
        looserxp: number;
    }
type AllGames =
    {
        win: number;
        loose: number;
        Draw: number;
        AllGames: GamesDTO[];
    }
function ProfileDown() {
    const { login } = useParams();
    const [ProfileRight, setPR] = useState<ProfileRightType | undefined>(undefined);
    const [widthPro, setwidthPro] = useState(0);
    const [dashArray, SetdashArray] = useState(100);
    const [allGames, setAllGams] = useState<AllGames | undefined>(undefined)

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/Profile/' + login + '/profile').then((resp) => setPR(resp.data));
            await axios.get('/Profile/' + login + '/gamehistory').then((resp) => setAllGams(resp.data));
        };
        fetchData();
    }, [login]);

    useEffect(() => {
        const calculateWidths = () => {
            if (ProfileRight) {
                const newWidthPro = (ProfileRight.xp / (200 * (ProfileRight.level + 1))) * 100;
                setwidthPro(newWidthPro);
                SetdashArray((newWidthPro / 100) * (138 - 100) + 100);
            }
        };
        calculateWidths();
    }, [ProfileRight])
    var arrayArch: Archivement[] = [];
    arrayArch.push({ title: 'Batal', img: batal }, { title: 'Hawking', img: hawking })

    const [AchivementArr, setAchievement] = useState<any>({});

    useEffect(() => {
        const FecthData = async () => {
            await axios.get('/Profile/Achievement').then((rsp: any) => {
                setAchievement(rsp.data);
            })
        }
        FecthData();
    }, [])
    return (
        <div className="profileDown">
            <motion.div
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                exit={{ y: '100vh' }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="AchivementsProfile">
                <h1>Achievements</h1>
                <GradienBox mywidth={'380px'} myheight={'388px'} myborder={'40px'}>
                    <div className="archivement-container" style={{ overflow: 'hidden' }}>
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img style={{ width: '100%', filter: (AchivementArr.Batal ? 'saturate(1)' : 'saturate(0)') }} src={batal} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img style={{ width: '100%', filter: (AchivementArr.Hawking ? 'saturate(1)' : 'saturate(0)') }} src={hawking} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img style={{ width: '100%', filter: (AchivementArr.Worldcup ? 'saturate(1)' : 'saturate(0)') }} src={worldCup} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img style={{ width: '100%', filter: (AchivementArr.Helmchen ? 'saturate(1)' : 'saturate(0)') }} src={helmchen} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img style={{ width: '100%', filter: (AchivementArr.kasparov ? 'saturate(1)' : 'saturate(0)') }} src={kasparov} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img style={{ width: '100%', filter: (AchivementArr.extrovert ? 'saturate(1)' : 'saturate(0)') }} src={extrovert} alt="" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </GradienBox>
            </motion.div>
            <motion.div
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                exit={{ y: '100vh' }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="UpgradeProfile">
                <h1>Upgrade Progress</h1>
                <GradienBox mywidth={'344px'} myheight={'388px'} myborder={'40px'}>
                    <div className="container-pro">
                        <div className="progress-Cont">
                            <div className="outer">
                                <div className="inner">
                                    <div className="number">{widthPro.toString().slice(0, 4) + '%'}</div>
                                </div>
                            </div>
                        </div>
                        <svg className='svg-progress'
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="27.875rem"
                            height="27.875rem"
                        >

                            <circle style={{ strokeDasharray: dashArray + 'rem' }} className='circle-progress' cx="13.938rem" cy="13.938rem" r="6rem" strokeLinecap="round" />
                        </svg>
                        <p>Track progress with dynamic graph arc. Stay motivated towards next climb.</p>
                    </div>
                </GradienBox>
            </motion.div>
            <motion.div
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                exit={{ y: '100vh' }}
                transition={{ duration: 0.4, delay: 1 }}
                className="HistoryProfile">
                <h1>Games History</h1>
                <GradienBox minh={'386px'} vh={870} mywidth={window.innerWidth > 770 ? '885px' : '1200px'} myheight={'388px'} myborder={'40px'}>
                    <div className="gameHistory">
                        <div className="headerHistory">
                            <div className="game-h wins">{(allGames != undefined ? allGames.win : 0) + ' WINS'}</div>
                            <div className="seperator"></div>
                            <div className="game-h draw">{(allGames != undefined ? allGames.Draw : 0) + ' DRAW'}</div>
                            <div className="seperator"></div>
                            <div className="game-h lose">{(allGames != undefined ? allGames.loose : 0) + ' LOSE'}</div>
                        </div>
                        <div className="gameHistoryC">
                            {
                                allGames?.AllGames.map((e, i) => <TheGame loser={e.looserxp} winner={e.Winnerxp} key={nanoid()}
                                    login={e.AdvName} mode={e.Mode} avatar={e.advPic}
                                    theGame={e.isDraw ? 'draw' : e.won ? 'win' : 'lose'
                                    }
                                />)
                            }
                        </div>
                    </div>
                </GradienBox>
            </motion.div>
        </div>
    )
}

export default ProfileDown