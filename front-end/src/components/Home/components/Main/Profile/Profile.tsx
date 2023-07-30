import './Profile.scss'
import GradienBox from '../../../../../tools/GradienBox'
import Charts from './Charts'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import axios from '../../../../../Interceptor/Interceptor'
import { Link, useParams } from 'react-router-dom';
import defaultAvatar from '../../../../../assets/img/avatar.png'
import 'swiper/css';
import 'swiper/css/effect-cards';
import {nanoid} from 'nanoid'


const Infobtn = () => {
    return (
        <button id='infoBtn' style={{ position: 'relative', top: '0.5rem' }}>
            <svg style={{ position: 'relative', }} width="1.625rem" height="1.625rem" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_di_601_56)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.8168 5.13513L14.8168 5.13513L14.9101 5.21512L14.9101 5.21513C15.1427 5.41451 15.2591 5.5142 15.3853 5.59334C15.6184 5.73943 15.8791 5.83588 16.1511 5.87664C16.2985 5.89872 16.4517 5.89872 16.7581 5.89872C17.5395 5.89872 17.9303 5.89872 18.2451 6.00643C18.8301 6.20662 19.2897 6.66618 19.4899 7.25124C19.5976 7.56602 19.5976 7.95676 19.5976 8.73823L19.5976 8.73824C19.5976 9.04462 19.5976 9.19781 19.6197 9.34516C19.6604 9.61721 19.7569 9.87792 19.903 10.111C19.9821 10.2372 20.0818 10.3535 20.2811 10.5861L20.2812 10.5862L20.3612 10.6795C20.9797 11.4011 21.289 11.7619 21.4108 12.1652C21.5248 12.5424 21.5248 12.9449 21.4108 13.3222C21.289 13.7254 20.9797 14.0862 20.3612 14.8078L20.2812 14.9012L20.2812 14.9012C20.0818 15.1338 19.9821 15.2501 19.903 15.3763C19.7569 15.6094 19.6604 15.8701 19.6197 16.1422C19.5976 16.2895 19.5976 16.4427 19.5976 16.7491C19.5976 17.5306 19.5976 17.9213 19.4899 18.2361C19.2897 18.8212 18.8301 19.2807 18.2451 19.4809C17.9303 19.5886 17.5395 19.5886 16.7581 19.5886C16.4517 19.5886 16.2985 19.5886 16.1511 19.6107C15.8791 19.6515 15.6184 19.7479 15.3853 19.894C15.2591 19.9731 15.1427 20.0728 14.9101 20.2722L14.8168 20.3522C14.0952 20.9707 13.7344 21.28 13.3311 21.4018C12.9539 21.5158 12.5514 21.5158 12.1741 21.4018C11.7709 21.28 11.4101 20.9707 10.6885 20.3522L10.6006 20.2769C10.3626 20.0729 10.2436 19.9709 10.1141 19.8903C9.88447 19.7475 9.62826 19.6527 9.36097 19.6117C9.21025 19.5886 9.05246 19.5886 8.73687 19.5886C7.94226 19.5886 7.54496 19.5886 7.22745 19.4789C6.64722 19.2783 6.19127 18.8223 5.99068 18.2421C5.88091 17.9246 5.88091 17.5301 5.88091 16.741C5.88091 16.4343 5.88091 16.281 5.85877 16.1334C5.81855 15.8655 5.72431 15.6085 5.58176 15.378C5.50325 15.2511 5.40411 15.1341 5.20583 14.9001L5.12507 14.8048C4.50845 14.0771 4.20014 13.7133 4.08085 13.3066C3.97305 12.9391 3.97305 12.5483 4.08085 12.1808C4.20014 11.7741 4.50845 11.4102 5.12507 10.6825L5.20583 10.5872C5.40411 10.3532 5.50325 10.2362 5.58176 10.1093C5.72431 9.87889 5.81855 9.62189 5.85877 9.35393C5.88091 9.20635 5.88091 9.05301 5.88091 8.74631L5.88091 8.74631C5.88091 7.95728 5.88091 7.56277 5.99068 7.24525C6.19127 6.66503 6.64722 6.20907 7.22744 6.00849C7.54496 5.89872 7.94226 5.89872 8.73687 5.89872C9.05246 5.89872 9.21025 5.89872 9.36097 5.8756C9.62826 5.83461 9.88447 5.73983 10.1141 5.597C10.2436 5.51647 10.3626 5.41445 10.6006 5.21042L10.6885 5.13513C11.4101 4.51661 11.7709 4.20734 12.1741 4.0855C12.5514 3.9715 12.9539 3.9715 13.3311 4.0855C13.7344 4.20734 14.0952 4.51661 14.8168 5.13513ZM13.4969 9.6142C13.4969 9.19998 13.1611 8.8642 12.7469 8.8642C12.3327 8.8642 11.9969 9.19998 11.9969 9.6142L11.9969 13.5256C11.9969 13.9398 12.3327 14.2756 12.7469 14.2756C13.1611 14.2756 13.4969 13.9398 13.4969 13.5256L13.4969 9.6142ZM12.7469 14.7313C12.1166 14.7313 11.6057 15.2422 11.6057 15.8724C11.6057 16.5027 12.1166 17.0136 12.7469 17.0136C13.3771 17.0136 13.888 16.5027 13.888 15.8724C13.888 15.2422 13.3771 14.7313 12.7469 14.7313Z" fill="#595052" />
                </g>
                <defs>
                    <filter id="filter0_di_601_56" x="0" y="0" width="25.4961" height="25.4874" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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

    const { login } = useParams();
    const [myFriends, setFriends] = useState([]);
    useEffect(() => {
        const Fetch = async () => {
            await axios.get('/Profile/' + login + '/Friends').then((response) => setFriends(response.data));
        }
        Fetch();
    }, [login])
    return (
        <div className="ProfileComponent-Activity-Friends">
            <motion.div
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                exit={{ y: '100vh' }}
                transition={{ duration: 0.4 }}
                className="fa-Profile profile-hol">
                <div className="textActive">
                    <h1>Activity</h1>
                    <Infobtn />
                    <div className="ActivityInfo pad">
                        <div className="textinfo"><p>{`Graphs of Recent 10 Gameplay ${login?.toUpperCase()} played!`}</p></div>
                    </div>
                </div>
                <div className="graph">
                    <div className="graphN">{elements}</div>
                    <GradienBox over={1} mywidth={'767px'} myheight={'324px'} myborder={'40px'}>
                        <Charts username={login} />
                    </GradienBox>
                </div>
            </motion.div>
            <motion.div
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                exit={{ y: '100vh' }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="fa-Profile">
                <h1>Friends</h1>
                <GradienBox mywidth={window.innerWidth > 770 ? '399px' : '1200px'} myheight={'324px'} myborder={'40px'}>
                    <div className="content-friend">
                        <div className="content-fri">
                            {
                                myFriends.length > 0 &&
                                myFriends.map((e: any, i: number) => {
                                    return (
                                        <div key={nanoid()} className="friend-Profile">
                                            <div className="friend-info">
                                                <Link to={'/profile/' + e.username}>
                                                    <img src={e.avatar} onError={(e: any) => {
                                                        e.target.src = defaultAvatar;
                                                    }
                                                    } alt="" />
                                                </Link>
                                                <p>{e.username}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="con-fr-fot">
                            {myFriends.length + ' Friends'}
                        </div>
                    </div>
                </GradienBox>
            </motion.div>
        </div>
    )
}

export default Profile;