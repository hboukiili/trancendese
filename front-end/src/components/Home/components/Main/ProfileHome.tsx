import GradienBox from '../../../../tools/GradienBox'
import "./ProfileHome.scss"
import SBadge from "../../../../assets/img/small-badge.svg"
import bronze from '../../../../assets/img/Badges/Bronze.png'
import silver from '../../../../assets/img/Badges/Silver.png'
import gold from '../../../../assets/img/Badges/Gold.png'
import platinium from '../../../../assets/img/Badges/Platinium.png'
import diamond from '../../../../assets/img/Badges/Diamond.png'
import master from '../../../../assets/img/Badges/Master.png'
import grandMaster from '../../../../assets/img/Badges/GrandMaster.png'
import { useSelector } from 'react-redux';
import defaultAvatar from '../../../../assets/img/avatar.png'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';

function ProfileHome() {


    var data: any = useSelector((state: any) => state.admin);

    const myBadge = () :string => {
        switch (data.badge)
        {
            case 'bronze':
                return bronze;
            case 'silver':
                return silver;
            case 'gold':
                return gold;
            case 'platinium':
                return platinium;
            case 'diamond':
                return diamond;
            case 'master':
                return master;
            case 'grandmaster':
                return grandMaster;
        }
        return ''
    }
    return (
        <motion.div
			initial={{ x: '100vw'}}
			animate={{ x: 0 }}
			exit={{  x: '100vw'}}
			transition={{ duration: 0.5 }}
            className="myProfile">
            <GradienBox mywidth="397px" myheight="284px" myborder="40px">
                {
                    <div className="profile-con">
                        <div className="profile-head">My Profile</div>
                        <AnimatePresence mode='wait'>
                            {
                                data.isLoader === true &&
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className='profile-mid'>
                                        <div className='mid1'>
                                            <Link  to={`/profile/${data.username}`} >
                                                <div style={{backgroundImage: `url(${data.avatar})`}}></div>
                                            </Link>
                                            <div className='m1-nl'>
                                                <h1 style={{ width: '6.25rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{data.username}</h1>
                                                <div className='m1-l'>
                                                    <img className='mid-img2' src={SBadge} alt='' />
                                                    <h3>Level <span>{data.level}</span></h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mid2'>
                                            <img className='mid-img3' alt='' src={myBadge()} />
                                        </div>
                                    </motion.div>
                                    <div className="seperator" />
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="profile-fot">
                                        <div className='pr'>
                                            <h1 className='title-f'>Last Game</h1>
                                            <h3>{data.lastGame}</h3>
                                        </div>
                                        <div className="sep-s" />
                                        <div className='pr'>
                                            <h1 className='title-f'>Status</h1>
                                            {data.status ? <h3 className='on'>Online</h3> : <h3 className='off'>Offline</h3>}
                                        </div>
                                        <div className="sep-s" />
                                        <div className='pr'>
                                            <h1 className='title-f'>Progress</h1>
                                            {
                                                data.lastGame === 'won' ? <h3 className='on prog'>+120<span className='on'>pts</span></h3> :
                                                    data.lastGame === 'draw' ? <h3 className='on prog'>+60<span className='on'>pts</span></h3> :
                                                        data.lastGame === 'lose' ? <h3 className='off prog'>-120<span className='off'>pts</span></h3> :
                                                            <h3 className='prog'>--</h3>
                                            }

                                        </div>
                                    </motion.div>
                                </>
                            }
                        </AnimatePresence>
                    </div>
                }
            </GradienBox>
        </motion.div>
    );
}

export default ProfileHome