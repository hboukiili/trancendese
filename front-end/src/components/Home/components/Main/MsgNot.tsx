import { useState, useRef, useEffect } from 'react'
import "./MsgNot.scss"
import inviFriend from "../../../../assets/img/invitation-friend.svg"
import BellImg from "../../../../assets/img/bell.svg"
import burger from "../../../../assets/img/burger.svg"
import GradienBox from '../../../../tools/GradienBox'
import { NavLink } from 'react-router-dom'
import { useOnClickOutside } from 'usehooks-ts'
import { ReactSVG } from 'react-svg';
import axios from '../../../../Interceptor/Interceptor'
import LogoutImg from "../../../../assets/img/Logout.svg";
import HomeImg from "../../../../assets/img/Home.svg";
import ProfImg from "../../../../assets/img/profile.svg";
import SetfImg from "../../../../assets/img/Settings.svg";
import ChatImg from "../../../../assets/img/chat.svg";
import defaultAvatar from "../../../../assets/img/avatar.png";
import LeaderBoard from "../../../../assets/img/leaderBoard.svg";
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'

function MsgNot(props: any) {
	const [isVisible, setIsVisible] = useState(false);
	const [isVisibleI, setIsVisibleI] = useState(false);
	const [isNav, setNavMo] = useState(false);
	const ref = useRef(null)
	const refI = useRef(null)
	const [Login, setLogin] = useState('')

	useEffect(() => {
		axios.get('/Home/Hero').then((response) => setLogin(response.data))
	}, [])
	const handleClickOutside = async () => {

		setIsVisible(false)
	}
	const handleClickOutsideI = async () => {

		setIsVisibleI(false)

	}
	useEffect(() => {
		const FecthIsfull = async () => {
			await axios.get('/isRequest').then((rsp) => props.setIsfull(rsp.data));
			await axios.get('/noticationState').then((rsp) => props.setIsfullN(rsp.data));
		}
		FecthIsfull();
	}, [])
	useOnClickOutside(ref, handleClickOutside);
	useOnClickOutside(refI, handleClickOutsideI);
	return (
		<div className='msgNot-cont' >
			<div ref={refI}>
				<GradienBox over={0} mywidth="49px" myheight="49px" myborder="10px">
					<button onClick={() => {
						props.socketInvi(false)
						setIsVisibleI(!isVisibleI)
					}
					} className='btn-msgnot'>
						<img style={{ width: '1.5rem', fill: 'red', transform: 'translateX(0.156rem)' }} src={inviFriend} alt='' />
						{props.isFull && <div className="isFull"></div>}
					</button>
				</GradienBox>
				<AnimatePresence mode='wait'>
					{
						isVisibleI &&
						<motion.div
							initial={{ scale: 0, }}
							animate={{ scale: 1, }}
							exit={{ scale: 0 }}
							key={'invitations'}
							transition={{ ease: "easeInOut" }}
							style={{ position: 'absolute', top: '3.5rem', width: 'fit-content', transform: 'translateX(-15rem)' }}>
							<NotificationCont isN={false} />
						</motion.div>
					}
				</AnimatePresence>
			</div>
			<div ref={ref}>
				<GradienBox mywidth="49px" myheight="49px" myborder="10px">
					<button onClick={() => setIsVisible(!isVisible)} className='btn-msgnot'><img style={{ width: '1.5rem' }} alt='' src={BellImg} />
						{
							props.isFullN && <div className="isFull"></div>
						}
					</button>
				</GradienBox>
				<AnimatePresence mode='wait'>
					{
						isVisible &&
						<motion.div
							initial={{ scale: 0, }}
							animate={{ scale: 1, }}
							exit={{ scale: 0 }}
							key={'notifi'}
							transition={{ ease: "easeInOut" }}
							style={{ position: 'absolute', top: '3.5rem', left: '5rem', width: 'fit-content' }}>
							<NotificationCont data={props.noti} isN={true} />
						</motion.div>

					}
				</AnimatePresence>
			</div>

			<div onClick={() => setNavMo(true)} className='burger'>
				<GradienBox mywidth="49px" myheight="49px" myborder="10px">
					<button className='btn-msgnot'><img style={{ width: '1.5rem' }} src={burger} alt='' /></button>
				</GradienBox>
			</div>
			<AnimatePresence mode='wait'>
				{isNav &&
					<motion.div className="nav-mobile"
						key='nav-mobile.'
						initial={{ x: '100vh' }}
						animate={{ x: 0 }}
						exit={{ x: '100vh' }}
					>
						<button onClick={() => setNavMo(false)}>X</button>
						<ul>
							<NavLink onClick={() => setNavMo(false)} className={({ isActive }) =>
								isActive ? 'nav-icon-act nav-mobile-icon' : 'nav-icon nav-mobile-icon'
							} to='/'>
								<ReactSVG src={HomeImg} />
								{/* <img style={{ width: '1.5rem' }} src={HomeImg} alt="Home" /> */}
							</NavLink>
							<NavLink onClick={() => setNavMo(false)} className={({ isActive }) =>
								isActive ? 'nav-icon-act nav-mobile-icon' : 'nav-icon nav-mobile-icon'
							} to={'profile/' + Login}>
								<ReactSVG src={ProfImg} />
								{/* <img style={{ width: '1.5rem' }} src={ProfImg} alt="Profile" /> */}
							</NavLink>
							<NavLink onClick={() => setNavMo(false)} className={({ isActive }) =>
								isActive ? 'nav-icon-act nav-mobile-icon' : 'nav-icon nav-mobile-icon'
							} to='chat'>
								<ReactSVG src={ChatImg} />
								{/* <img style={{ width: '1.5rem' }} src={ChatImg} alt="Chat" /> */}
							</NavLink>
							<NavLink onClick={() => setNavMo(false)} className={({ isActive }) =>
								isActive ? 'nav-icon-act nav-mobile-icon' : 'nav-icon nav-mobile-icon'
							} to='leaderBoard'>
								<ReactSVG src={LeaderBoard} />
								{/* <img style={{ width: '1.5rem' }} src={LeaderBoard} alt="Leader Board" /> */}
							</NavLink>
							<NavLink onClick={() => setNavMo(false)} className={({ isActive }) =>
								isActive ? 'nav-icon-act nav-mobile-icon' : 'nav-icon nav-mobile-icon'
							} to='settings'>
								<ReactSVG src={SetfImg} />
								{/* <img style={{ width: '1.5rem' }} src={SetfImg} alt="Settings" /> */}
							</NavLink>
							<a style={{ paddingTop: '10rem' }} href={`${import.meta.env.VITE_URL + import.meta.env.VITE_PORT}/auth/logout`} className='logout'>
								<img style={{ width: '15rem' }} src={LogoutImg} alt="" />
							</a>
						</ul>
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}
function Notification(props: any) {
	const [textNotifi, setText] = useState('')
	const [isRead, setRead] = useState<boolean>(props.isRead);
	useEffect(() => {
		setText(text());
	}, [])
	const text = () => {
		switch (props.type) {
			case "Accepted_request":
				return `${props.username} accepted your request.`;
				break;
			case "game_invitation":
				return `${props.username} has invited you to a game of Ping Pong! Accept or decline the invitation now.`
				break;
			case "GroupInvitation":
				return `Check your Inbox Chat, ${props.username} has invited you in a Group!`;
				break;
			default:
				return '';
		}
	}
	text();
	const navigate = useNavigate();
	return (
		<div onClick={async () => {
			await axios.post('/ReadNotification', { notificationId: props.notificationId }).catch((err) => console.log());
			setRead(true);
			if (props.username)
				navigate(`/profile/${props.username}`);
		}} style={{ cursor: 'pointer' }} id={props.key} className="notification">
			<div className={!isRead ? "no-read" : ""}>
				<img src={(props.img ? props.img : defaultAvatar)} alt="" />
			</div>
			<div className="noti-text">{textNotifi}</div>
		</div>
	);
}
function Invitation(props: any) {
	const [visible, setvisible] = useState(true);

	const Accept = async () => {
		setvisible(false);
		await axios.post('/AcceptRequest', { FriendshipId: props.data.friendshipId });
	};
	const Decline = async () => {
		setvisible(false);
		await axios.post('/CancelRequest', { FriendshipId: props.data.friendshipId });
	}
	const navigate = useNavigate();
	return (
		<>
			<AnimatePresence mode='wait'>
				{
					visible &&
					<motion.div className="invitation-user"
						key='invitation-user'
						initial={{ y: 0 }}
						animate={{ y: 0 }}
						exit={{ x: '100%' }}
						transition={{ ease: "easeInOut", duration: 0.7 }}>

						<div onClick={() =>
							navigate(`/profile/${props.data.username}`)
						} className="info">
							<img onError={(e: any) => {
								e.target.src = defaultAvatar;
							}
							} src={props.data.avatar ? props.data.avatar : defaultAvatar} />
							<div className="who">
								<h4>{props.data.username}</h4>
								<p>Sent a request to you</p>
							</div>
						</div>
						<div className="btn">
							<button onClick={Decline}><div className="text decline">Decline</div></button>
							<button onClick={Accept}><div className="text ">Accept</div></button>
						</div>
					</motion.div>
				}
			</AnimatePresence>
		</>
	)
}
function NotificationCont(props: any) {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(props.isN === true ? '/getNotification' : '/FriendshipRequest');
				setData(response.data);

			} catch (err) {
			}
		};
		fetchData();
	}, []);

	return (
		<GradienBox absolute={1} mywidth="316px" myheight="408.98px" myborder="20px">
			<div className="notification-container">
				<div className="head-noti-container">
					<div className="notication-head">{props.isN === true ? 'NOTIFICATIONS' : 'NEW REQUESTS'}</div>
					<span className='notifi-num'>{data.filter((e: any) => !e.isRead).length}</span>
					{/* notifi.filter((not: any) => not.isRead === 0).length */}
				</div>
				<div className="main-noti">

					{
						!props.isN ?
							data.map((e: any, i: number) => <Invitation key={nanoid()} data={e} />)
							:
							data.map((e: any) => {
								return (<Notification notificationId={e.notificationId} key={nanoid()} username={e.username} type={e.Type} isRead={e.isRead} img={e.avatar ? e.avatar : null} />);
							})
					}
				</div>
				{
					props.isN === true &&
					<div className="fot-notification">
						<button onClick={async () => {
							await axios.post('/readallnotification');
							window.location.reload();
						}} className='mark-read'>Mark all as read</button>
					</div>
				}

			</div>
		</GradienBox>
	)
}


export default MsgNot