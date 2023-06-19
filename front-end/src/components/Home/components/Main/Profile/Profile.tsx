import './Profile.scss'
import GradienBox from '../../../../../tools/GradienBox'
import Charts from './Charts'
import { useSelector } from 'react-redux'
import { userType } from '../../../../../interface/interfaces'
import btnSlide from './buttonSlide.svg'
import { motion, AnimatePresence } from 'framer-motion'
import ACE from './Ace.svg'
import { useState } from 'react'
import avatar from './avatar.svg'

const Chat = () => {
    return (
        <div>
            <svg width="1.125rem" height="1.125rem" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.891112 12.8589C0.869162 12.812 0.847289 12.7653 0.825725 12.7188C0.295686 11.5746 0 10.3001 0 8.95833C0 4.01078 4.01078 0 8.95833 0C13.9059 0 17.9167 4.01078 17.9167 8.95833C17.9167 13.9059 13.9059 17.9167 8.95833 17.9167C7.94665 17.9167 7.06009 17.7721 6.22805 17.4745C5.48363 17.2082 5.17857 17.1004 5.08652 17.0787C4.52715 16.9472 3.99758 17.2021 3.4721 17.455C3.13281 17.6183 2.79522 17.7808 2.45242 17.8379C1.51535 17.9941 0.681554 17.2269 0.759318 16.2801C0.787101 15.9418 0.918047 15.6527 1.04981 15.3618C1.13469 15.1745 1.2199 14.9863 1.2781 14.7838C1.4738 14.1028 1.17594 13.467 0.891112 12.8589ZM5.625 6.54167C5.21079 6.54167 4.875 6.87745 4.875 7.29167C4.875 7.70588 5.21079 8.04167 5.625 8.04167H12.2917C12.7059 8.04167 13.0417 7.70588 13.0417 7.29167C13.0417 6.87745 12.7059 6.54167 12.2917 6.54167H5.625ZM5.625 9.875C5.21079 9.875 4.875 10.2108 4.875 10.625C4.875 11.0392 5.21079 11.375 5.625 11.375H8.95833C9.37255 11.375 9.70833 11.0392 9.70833 10.625C9.70833 10.2108 9.37255 9.875 8.95833 9.875H5.625Z" fill="white" />
            </svg>
        </div>
    )
}
const Infobtn = () => {
    return (
        <button style={{ position: 'relative', top: '0.5rem' }}>
            <svg style={{ position: 'relative', }} width="1.625rem" height="1.625rem" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_di_601_56)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8168 5.13513L14.8168 5.13513L14.9101 5.21512L14.9101 5.21513C15.1427 5.41451 15.2591 5.5142 15.3853 5.59334C15.6184 5.73943 15.8791 5.83588 16.1511 5.87664C16.2985 5.89872 16.4517 5.89872 16.7581 5.89872C17.5395 5.89872 17.9303 5.89872 18.2451 6.00643C18.8301 6.20662 19.2897 6.66618 19.4899 7.25124C19.5976 7.56602 19.5976 7.95676 19.5976 8.73823L19.5976 8.73824C19.5976 9.04462 19.5976 9.19781 19.6197 9.34516C19.6604 9.61721 19.7569 9.87792 19.903 10.111C19.9821 10.2372 20.0818 10.3535 20.2811 10.5861L20.2812 10.5862L20.3612 10.6795C20.9797 11.4011 21.289 11.7619 21.4108 12.1652C21.5248 12.5424 21.5248 12.9449 21.4108 13.3222C21.289 13.7254 20.9797 14.0862 20.3612 14.8078L20.2812 14.9012L20.2812 14.9012C20.0818 15.1338 19.9821 15.2501 19.903 15.3763C19.7569 15.6094 19.6604 15.8701 19.6197 16.1422C19.5976 16.2895 19.5976 16.4427 19.5976 16.7491C19.5976 17.5306 19.5976 17.9213 19.4899 18.2361C19.2897 18.8212 18.8301 19.2807 18.2451 19.4809C17.9303 19.5886 17.5395 19.5886 16.7581 19.5886C16.4517 19.5886 16.2985 19.5886 16.1511 19.6107C15.8791 19.6515 15.6184 19.7479 15.3853 19.894C15.2591 19.9731 15.1427 20.0728 14.9101 20.2722L14.8168 20.3522C14.0952 20.9707 13.7344 21.28 13.3311 21.4018C12.9539 21.5158 12.5514 21.5158 12.1741 21.4018C11.7709 21.28 11.4101 20.9707 10.6885 20.3522L10.6006 20.2769C10.3626 20.0729 10.2436 19.9709 10.1141 19.8903C9.88447 19.7475 9.62826 19.6527 9.36097 19.6117C9.21025 19.5886 9.05246 19.5886 8.73687 19.5886C7.94226 19.5886 7.54496 19.5886 7.22745 19.4789C6.64722 19.2783 6.19127 18.8223 5.99068 18.2421C5.88091 17.9246 5.88091 17.5301 5.88091 16.741C5.88091 16.4343 5.88091 16.281 5.85877 16.1334C5.81855 15.8655 5.72431 15.6085 5.58176 15.378C5.50325 15.2511 5.40411 15.1341 5.20583 14.9001L5.12507 14.8048C4.50845 14.0771 4.20014 13.7133 4.08085 13.3066C3.97305 12.9391 3.97305 12.5483 4.08085 12.1808C4.20014 11.7741 4.50845 11.4102 5.12507 10.6825L5.20583 10.5872C5.40411 10.3532 5.50325 10.2362 5.58176 10.1093C5.72431 9.87889 5.81855 9.62189 5.85877 9.35393C5.88091 9.20635 5.88091 9.05301 5.88091 8.74631L5.88091 8.74631C5.88091 7.95728 5.88091 7.56277 5.99068 7.24525C6.19127 6.66503 6.64722 6.20907 7.22744 6.00849C7.54496 5.89872 7.94226 5.89872 8.73687 5.89872C9.05246 5.89872 9.21025 5.89872 9.36097 5.8756C9.62826 5.83461 9.88447 5.73983 10.1141 5.597C10.2436 5.51647 10.3626 5.41445 10.6006 5.21042L10.6885 5.13513C11.4101 4.51661 11.7709 4.20734 12.1741 4.0855C12.5514 3.9715 12.9539 3.9715 13.3311 4.0855C13.7344 4.20734 14.0952 4.51661 14.8168 5.13513ZM13.4969 9.6142C13.4969 9.19998 13.1611 8.8642 12.7469 8.8642C12.3327 8.8642 11.9969 9.19998 11.9969 9.6142L11.9969 13.5256C11.9969 13.9398 12.3327 14.2756 12.7469 14.2756C13.1611 14.2756 13.4969 13.9398 13.4969 13.5256L13.4969 9.6142ZM12.7469 14.7313C12.1166 14.7313 11.6057 15.2422 11.6057 15.8724C11.6057 16.5027 12.1166 17.0136 12.7469 17.0136C13.3771 17.0136 13.888 16.5027 13.888 15.8724C13.888 15.2422 13.3771 14.7313 12.7469 14.7313Z" fill="#595052" />
                </g>
                <defs>
                    <filter id="filter0_di_601_56" x="0" y="0" width="25.4961" height="25.4874" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_601_56" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_601_56" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_601_56" />
                    </filter>
                </defs>
            </svg>
        </button>
    )
}
var elements: any[] = [];
for (let i = 1200; i >= 0; i -= 240) {
    elements.push(
        <p>{' ' + i}</p>
    );
}

function Profile() {
    const Admin: userType = useSelector((state: any) => state.admin);
    const Friends: userType[] = useSelector((state: any) => state.users.users).filter((e: userType) => e.isFriend === true && e.login !== Admin.login);
    return (
        <div className="ProfileComponent-Activity-Friends">
            <div className="fa-Profile">
                <div className="textActive">
                    <h1>Activity</h1>
                    <Infobtn />
                </div>
                <div className="graph">
                    <div className="graphN">{elements}</div>
                    <GradienBox over={1} mywidth={'767px'} myheight={'324px'} myborder={'40px'}>
                        <Charts />
                    </GradienBox>
                </div>
            </div>
            <div className="fa-Profile">
                <h1>Friends</h1>
                <GradienBox mywidth={'399px'} myheight={'324px'} myborder={'40px'}>
                    <div className="content-friend">
                        <div className="content-fri">
                            {
                                Friends.map((e: userType) => {
                                    return (
                                        <div className="friend-Profile">
                                            <div className="friend-info">
                                                <img src={e.avatar} alt="" />
                                                <p>{e.login}</p>
                                            </div>
                                            <div className="buttons-f">
                                                <button><div>Send Message</div></button>
                                                <button className='IP'><div >Invite to Play</div></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </GradienBox>
            </div>
        </div>
    )
}


export function ProfileProfile() {
    const Admin: userType = useSelector((state: any) => state.admin);
    return (
        <GradienBox mywidth={'397px'} myheight={'526px'} myborder={'40px'}>
            <div className="container-Profile-profile">
                <h1>Profile</h1>
                <div className='imgS'>
                    <img src={Admin.avatar} alt="" />
                </div>
                <h2>{Admin.login}</h2>
                <div className="status"><span className='dotss'></span><span className='txt-status'> Offline</span></div>
                <div className="buttons-f">
                    <button><Chat /></button>
                    <button><Chat /></button>
                </div>
                <div className="progress">
                    <div className="content-progress">
                        <div className="absoluteProgress"></div>
                        <h5 className='From'>{'Lv.' + Admin.level}</h5>
                        <h5 className='center'>1721 XP   /   2000 XP</h5>
                        <h5 className='to'>Lv.2</h5>
                    </div>
                </div>
                <div className="footerP">
                    <div className="footerCon">
                        <div className="footedge">
                            <h4>Rank</h4>
                            <h4 className='green'>2</h4>
                        </div>
                        <div className="footCenter"></div>
                        <div className="footedge gaping-edge">
                            <h4>Ratings</h4>
                            <h4 className='green'>8.9</h4>
                        </div>
                    </div>
                </div>
            </div>
        </GradienBox>
    )
}

function TheGame(props: any) {
    return (
        <div className="firstLayer">
            <div className="secondLayer">
                <div className={props.theGame === 'win' ? "gameSta winGame" :
                    props.theGame === 'lose' ? 'gameSta loseGame' : 'gameSta'}>
                    <div className="infoGame">
                        <img src={avatar} alt="Enemey" />
                        <div className="enemyScore">
                            <h1>cerulean</h1>
                            <div className="score">
                                <h1 className='Goal Win'>10</h1>
                                <div className="Goal Win">|</div>
                                <h1 className='Goal Lose'>10</h1>
                            </div>
                        </div>
                    </div>
                    <div className="xpGame">
                        <h1>+120 XP</h1>
                        <h1 className='modeGame'>FRIENDs MODE</h1>
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
export function ProfileDown() {
    const [index, setIndex] = useState<number>(0);
    const [Direction, setDirection] = useState<number>(0);
    var arrayArch: Archivement[] = [];
    const AceArchivement = {
        title: 'Ace',
        img: ACE
    };
    arrayArch.push(AceArchivement, { title: 'Mays', img: ACE }, { title: 'Kays', img: ACE })
    const variants = {
        initial: (Direction: number) => {
            return ({
                x: Direction > 0 ? '23rem' : '-23rem'
            })
        },
        animate: {
            x: 0,
        },
        exit: (Direction: number) => {
            return ({
                x: Direction > 0 ? '-23rem' : '23rem'
            })
        },
    }
    return (
        <div className="profileDown">
            <div className="AchivementsProfile">
                <h1>Achievements</h1>
                <GradienBox mywidth={'380px'} myheight={'388px'} myborder={'40px'}>
                    <div className="archivement-container" style={{ overflow: 'hidden' }}>
                        <button onClick={() => {
                            setDirection(1)
                            if (index - 1 < 0)
                                setIndex(arrayArch.length - 1);
                            else
                                setIndex(index - 1);
                        }} className='button-slide'><div className="backjack"><img src={btnSlide} alt="" /></div></button>
                        <AnimatePresence initial={false} custom={Direction}>
                            <motion.h1
                                key={arrayArch[index].title}
                                variants={variants}
                                custom={Direction}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                transition={{
                                    x: { duration: 0.6 },
                                    opacity: { duration: 0.2 }
                                }}
                            >{arrayArch[index].title}
                            </motion.h1>
                        </AnimatePresence>
                        <button onClick={() => {
                            setDirection(-1)
                            if (index + 1 >= arrayArch.length)
                                setIndex(0);
                            else
                                setIndex(index + 1);
                        }} className='button-slide right-btn'><div className="backjack"><img className='imgRight' src={btnSlide} alt="" /></div></button>
                    </div>
                </GradienBox>
            </div>
            <div className="UpgradeProfile">
                <h1>Upgrade Progress</h1>
                <GradienBox mywidth={'344px'} myheight={'388px'} myborder={'40px'}>
                    <div className="container-pro">
                        <div className="progress-Cont">
                            <div className="outer">
                                <div className="inner">
                                    <div className="number">79%</div>
                                </div>
                            </div>
                        </div>
                        <svg className='svg-progress'
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="27.875rem"
                            height="27.875rem"
                        >
                            <circle className='circle-progress' cx="13.938rem" cy="13.938rem" r="6rem" stroke-linecap="round" />
                        </svg>
                        <p>Track progress with dynamic graph arc. Stay motivated towards next climb.</p>
                    </div>
                </GradienBox>
            </div>
            <div className="HistoryProfile">
                <h1>Games History</h1>
                <GradienBox mywidth={'885px'} myheight={'388px'} myborder={'40px'}>
                    <div className="gameHistory">
                        <div className="headerHistory">
                            <div className="game-h wins">7 WINS</div>
                            <div className="seperator"></div>
                            <div className="game-h draw">3 DRAW</div>
                            <div className="seperator"></div>
                            <div className="game-h lose">1 LOSE</div>
                        </div>
                        <div className="gameHistoryC">
                            <TheGame theGame='win' />
                            <TheGame theGame='lose' />
                            <TheGame  />
                            <TheGame theGame='win' />
                        </div>
                    </div>
                </GradienBox>
            </div>
        </div>
    )
}

export default Profile;