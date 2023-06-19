import GradienBox from '../../../../tools/GradienBox'
import "./ProfileHome.scss"
import SBadge from "../../../../assets/img/small-badge.svg"
import BBadge from "../../../../assets/img/big-badge.svg"

import axios from '../../../../Interceptor/Interceptor'
import { useEffect, useState } from 'react';

function ProfileHome() {
    const [data, setdata] = useState('')
    useEffect(()=>{
        axios.get('/MyProfile').then(( response ) => setdata(response.data))
    },[])
    return (
        <GradienBox mywidth="397px" myheight="284px" myborder="40px">
            {data &&
                <div className="profile-con">
                    <div className="profile-head">My Profile</div>
                    <div className='profile-mid'>
                        <div className='mid1'>
                            <img className='mid-img1' alt='' src={data.avatar} />
                            <div className='m1-nl'>
                                <h1>{data.username}</h1>
                                <div className='m1-l'>
                                    <img className='mid-img2' src={SBadge} alt='' />
                                    <h3>Level <span>{data.level}</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className='mid2'>
                            <img className='mid-img3' alt='' src={BBadge} />
                        </div>
                    </div>
                    <div className="seperator" />
                    <div className="profile-fot">
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
                    </div>
                </div>
            }
        </GradienBox>
    )
}

export default ProfileHome