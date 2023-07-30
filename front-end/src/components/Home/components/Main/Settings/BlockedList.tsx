import { useEffect, useState } from 'react';
import './Settings.scss'
import axios from '../../../../../Interceptor/Interceptor'
import {nanoid} from 'nanoid'


function Blockedlist() {
    const [update, setUpdate] = useState(true);
    function UserB(props: any) {
        const Deblock = async () => {
            await axios.post('/CancelRequest', { FriendshipId: props.idShip })
            setUpdate(!update)
        }
        return (
            <div className="userBlocked">
                <div className="infoUser">
                    <img src={props.avatar} alt="" />
                    <p>{props.username}</p>
                </div>
                <button onClick={Deblock}>
                    <div className="unblockBTN">Unblock</div>
                </button>
            </div>
        )
    }

    const [data, setData] = useState([])
    useEffect(() => {
        const FetchData = async () => {
            await axios.get("/setting/blockedlist").then(resp => setData(resp.data))
        };
        FetchData();
    }, [update])
    return (
        <div className='BlockedList'>
            <div className="Blocked-cont">
                <h1>Blocked Account</h1>
                <div className="blockedListC">
                    <div className="usersBlocked">
                        {
                            data.length > 0 ? data.map((e: any, number) => <UserB key={nanoid()} idShip={e.friendshipId} avatar={e.avatar} username={e.username} />) : <p>No User Blocked</p>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Blockedlist;