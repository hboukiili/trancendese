import './Profile.scss'
import GradienBox from '../../../../../tools/GradienBox'
import { AppDispatch } from '../../../../../store/store'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import axios from '../../../../../Interceptor/Interceptor'
import { useParams } from 'react-router-dom';
import defaultAvatar from '../../../../../assets/img/avatar.png'
const Playbtn = () => (
    <div>
        <svg width={(12 / 16) + 'rem'} height={(15 / 16) + 'rem'} viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.7562 14.3286C1.37233 14.5781 0.983854 14.5927 0.590773 14.3724C0.197692 14.152 0.000767737 13.8112 0 13.3497V1.43063C0 0.969993 0.196924 0.629118 0.590773 0.408009C0.984622 0.186901 1.3731 0.201488 1.7562 0.45177L11.1418 6.41133C11.4873 6.64165 11.66 6.96794 11.66 7.39019C11.66 7.81245 11.4873 8.13874 11.1418 8.36906L1.7562 14.3286Z" fill="white" />
        </svg>
    </div>
)

const Chatbtn = () => (
    <div>
        <svg width="1.125rem" height="1.125rem" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.891112 12.8589C0.869162 12.812 0.847289 12.7653 0.825725 12.7188C0.295686 11.5746 0 10.3001 0 8.95833C0 4.01078 4.01078 0 8.95833 0C13.9059 0 17.9167 4.01078 17.9167 8.95833C17.9167 13.9059 13.9059 17.9167 8.95833 17.9167C7.94665 17.9167 7.06009 17.7721 6.22805 17.4745C5.48363 17.2082 5.17857 17.1004 5.08652 17.0787C4.52715 16.9472 3.99758 17.2021 3.4721 17.455C3.13281 17.6183 2.79522 17.7808 2.45242 17.8379C1.51535 17.9941 0.681554 17.2269 0.759318 16.2801C0.787101 15.9418 0.918047 15.6527 1.04981 15.3618C1.13469 15.1745 1.2199 14.9863 1.2781 14.7838C1.4738 14.1028 1.17594 13.467 0.891112 12.8589ZM5.625 6.54167C5.21079 6.54167 4.875 6.87745 4.875 7.29167C4.875 7.70588 5.21079 8.04167 5.625 8.04167H12.2917C12.7059 8.04167 13.0417 7.70588 13.0417 7.29167C13.0417 6.87745 12.7059 6.54167 12.2917 6.54167H5.625ZM5.625 9.875C5.21079 9.875 4.875 10.2108 4.875 10.625C4.875 11.0392 5.21079 11.375 5.625 11.375H8.95833C9.37255 11.375 9.70833 11.0392 9.70833 10.625C9.70833 10.2108 9.37255 9.875 8.95833 9.875H5.625Z" fill="white" />
        </svg>
    </div>
)

const Addbtn = () => (
    <div>
        <svg style={{ transform: 'translateX(' + (2 / 16) + 'rem)' }} width={(20 / 16) + 'rem'} height={(20 / 16) + 'rem'} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.50016 1.04163C5.31404 1.04163 3.54183 2.81383 3.54183 4.99996C3.54183 7.18609 5.31404 8.95829 7.50016 8.95829C9.68629 8.95829 11.4585 7.18609 11.4585 4.99996C11.4585 2.81383 9.68629 1.04163 7.50016 1.04163ZM0.208496 15.7916C0.208496 13.1683 2.33514 11.0416 4.9585 11.0416H10.0418C12.6652 11.0416 14.7918 13.1683 14.7918 15.7916C14.7918 17.5405 13.3741 18.9583 11.6252 18.9583H3.37516C1.62626 18.9583 0.208496 17.5405 0.208496 15.7916ZM17.4168 5.83329C17.4168 5.41908 17.081 5.08329 16.6668 5.08329C16.2526 5.08329 15.9168 5.41908 15.9168 5.83329V7.58329H14.1668C13.7526 7.58329 13.4168 7.91908 13.4168 8.33329C13.4168 8.74751 13.7526 9.08329 14.1668 9.08329H15.9168V10.8333C15.9168 11.2475 16.2526 11.5833 16.6668 11.5833C17.081 11.5833 17.4168 11.2475 17.4168 10.8333V9.08329H19.1668C19.581 9.08329 19.9168 8.74751 19.9168 8.33329C19.9168 7.91908 19.581 7.58329 19.1668 7.58329H17.4168V5.83329Z" fill="white" />
        </svg>

    </div>
)
const Blockbtn = () => (
    <div>
        <svg style={{ transform: 'translateX(' + (2 / 16) + 'rem)' }} width={(21 / 16) + 'rem'} height={(18 / 16) + 'rem'} viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.42857 4.29488C3.42857 1.92289 5.25141 0 7.5 0C9.74859 0 11.5714 1.92289 11.5714 4.29488C11.5714 6.66688 9.74859 8.58977 7.5 8.58977C5.25141 8.58977 3.42857 6.66688 3.42857 4.29488Z" fill="white" />
            <path d="M5.15386 10.8502C2.30746 10.8502 0 13.1577 0 16.0041C0 17.9017 1.53831 19.44 3.43591 19.44H11.5641C13.4617 19.44 15 17.9017 15 16.0041C15 13.1577 12.6925 10.8502 9.84614 10.8502H5.15386Z" fill="white" />
            <path d="M19.8536 7.14645L15.8536 3.14645L15.1464 3.85355L19.1464 7.85355L19.8536 7.14645ZM20.5 5.5C20.5 7.15685 19.1569 8.5 17.5 8.5C15.8431 8.5 14.5 7.15685 14.5 5.5C14.5 3.84315 15.8431 2.5 17.5 2.5C19.1569 2.5 20.5 3.84315 20.5 5.5Z" stroke="white" />
        </svg>

    </div>
)

const UnFriendbtn = () => (
    <div>
        <svg style={{ transform: 'translateX(' + (2 / 16) + 'rem)' }} width={(20 / 16) + 'rem'} height={(20 / 16) + 'rem'} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="13" y="7.5" width="7" height="2" rx="1" fill="white" />
            <path d="M3.54168 4.99999C3.54168 2.81386 5.31388 1.04166 7.50001 1.04166C9.68614 1.04166 11.4583 2.81386 11.4583 4.99999C11.4583 7.18612 9.68614 8.95832 7.50001 8.95832C5.31388 8.95832 3.54168 7.18612 3.54168 4.99999Z" fill="white" />
            <path d="M4.95835 11.0417C2.33499 11.0417 0.208344 13.1683 0.208344 15.7917V15.7917C0.208344 17.5406 1.62611 18.9583 3.37501 18.9583H11.625C13.3739 18.9583 14.7917 17.5406 14.7917 15.7917V15.7917C14.7917 13.1683 12.665 11.0417 10.0417 11.0417H4.95835Z" fill="white" />
        </svg>
    </div>

)

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
export function ProfileProfile() {

    const { login } = useParams();
    const myData = useSelector((state:any) =>state.admin)
    const [widthPro, setwidthPro] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [ProfileRight, setPR] = useState<ProfileRightType>({
        avatar: '',
        status: false,
        level: 0,
        xp: 0,
        username: '',
        isOwner: true,
        UserId: "",
        isFriend: false,
        friendshipId: 0,
        isSent: false,
        rank: 0,
        rating: undefined,
    });
    const [update, setUpdate] = useState(false);
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {

        const Fetch = async () => {
            await axios.get('/Profile/' + login + '/profile').then((response) => {
                setPR(response.data)
            }).catch((e) => {
                navigate('/404');
            })
            setOpacity(1);
        }
        {
            Fetch();
        }

    }, [login, update]);

    useEffect(() => {
        setwidthPro(((ProfileRight.xp / (200 * (ProfileRight.level + 1))) * 100));
        setOpacity(1);
    }, [ProfileRight])

    const AddFriend = async () => {
        await axios.post("/SendRequest", { receiverId: ProfileRight.UserId }).then(resp => {
            setUpdate(!update);
        })
    }
    const BlockUser = async () => {
        await axios.post("/Profile/blockUser", { blockedUser: ProfileRight.username }).then(resp => {
            setUpdate(!update);
        })
    }
    const CancelFriend = async () => {
        await axios.post("/CancelRequest", { FriendshipId: ProfileRight.friendshipId }).then(resp => {
            setUpdate(!update);
        })
    }
    return (
        <motion.div
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="profileRE">
            <GradienBox mywidth={window.innerWidth > 770 ? '397px' : '1200px'} myheight={'526px'} myborder={'40px'}>
                <div className="container-Profile-profile">
                    <h1>Profile</h1>
                    <div className='imgS'>
                        <img src={ProfileRight.avatar ? ProfileRight.avatar : defaultAvatar} onError={(e: any) => {
                            e.target.src = defaultAvatar;
                        }
                        } alt="" />
                    </div>
                    <h2>{ProfileRight.username}</h2>
                    {
                        (ProfileRight.isOwner || ProfileRight.isFriend) &&
                        <div className="status"><span className={(!ProfileRight.status ? 'dotss' : 'dotss greenDotss')}></span><span className={(!ProfileRight.status ? 'txt-status' : 'txt-status greenStatus')}>{(!ProfileRight.status ? 'Offline' : 'Online')}</span></div>

                    }
                    <div className="buttons-f">
                        {
                            ProfileRight.isOwner === false ?
                                <>
                                    {
                                        ProfileRight.isFriend ?
                                            <>
                                                <button onClick={CancelFriend}><UnFriendbtn /></button>
                                                <button onClick={BlockUser}><Blockbtn /></button>
                                                <button onClick={() => {
                                                    navigate(`/chat/${ProfileRight.RoomId}`)
                                                }}><Chatbtn /></button>
                                                <button onClick={async() => {
                                                    await axios.post('/GameInvitation', {
                                                        receiver: ProfileRight.UserId
                                                    })
                                                    navigate(`/game/friends/${myData.UserId}`);
                                                }}><Playbtn /></button>
                                            </> :
                                            <>
                                                <button onClick={BlockUser}><Blockbtn /></button>
                                                {
                                                    (ProfileRight.isSent === false ? <button onClick={AddFriend}><Addbtn /></button> : <button onClick={CancelFriend}><UnFriendbtn /></button>)
                                                }
                                            </>

                                    }
                                </> : <></>
                        }
                    </div>
                    <div className="progress">
                        <div className="content-progress">
                            <div style={{ backgroundImage: 'linear-gradient(to right, #00887A ' + (widthPro) + '%, #2C282C ' + (widthPro) + '%)', opacity }} className="absoluteProgress"></div>
                            <h5 className='From'>{'Lv.' + ProfileRight.level}</h5>
                            <h5 className='center'>{ProfileRight.xp + 'XP   /   ' + (200 * (ProfileRight.level + 1)) + 'XP'}</h5>
                            <h5 className='to'>{'Lv.' + (ProfileRight.level + 1)}</h5>
                        </div>
                    </div>
                    <div className="footerP">
                        <div className="footerCon">
                            <div className="footedge">
                                <h4>Rank</h4>
                                <h4 className='green'>{ProfileRight.rank}</h4>
                            </div>
                            <div className="footCenter"></div>
                            <div className="footedge gaping-edge">
                                <h4>Ratings</h4>
                                <h4 className='green'>{ProfileRight.rating !== 'NaN' ? ProfileRight.rating : '--'}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </GradienBox>
        </motion.div>
    )
}
export default ProfileProfile;