import { useState, useRef, useEffect, useMemo } from 'react'
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
// import 'badge' from "../../../../assets/img/'badge'-noti.svg";
// remember??
import HomeImg from "../../../../assets/img/Home.svg";
import ProfImg from "../../../../assets/img/profile.svg";
import SetfImg from "../../../../assets/img/Settings.svg";
import ChatImg from "../../../../assets/img/chat.svg";
import defaultAvatar from "../../../../assets/img/avatar.png";
import Stream from "../../../../assets/img/stream.svg";
import LeaderBoard from "../../../../assets/img/leaderBoard.svg";
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import {nanoid} from 'nanoid'
function MsgNot(props: any) {
	const [isVisible, setIsVisible] = useState(false);
	const [isVisibleI, setIsVisibleI] = useState(false);
	const [isNav, setNavMo] = useState(false);
	const ref = useRef(null)
	const refI = useRef(null)
	const [Login, setLogin] = useState('')
	const [isFull, setIsfull] = useState(0);
	useEffect(() => {
		axios.get('/Home/Hero').then((response) => setLogin(response.data))
	}, [])
	const handleClickOutside = async () => {

		setIsVisible(false)
	}
	const handleClickOutsideI = async () => {

		setIsVisibleI(false)

	}

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
						{isFull > 0 && <div className="isFull"></div>}
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
							transition={{ ease: "easeInOut"}}
							style={{ position: 'absolute', top: '3.5rem', width: 'fit-content', transform: 'translateX(-15rem)' }}>
							<NotificationCont isN={false} />
						</motion.div>
					}
				</AnimatePresence>
			</div>
			<div ref={ref}>
				<GradienBox mywidth="49px" myheight="49px" myborder="10px">
					<button onClick={() => setIsVisible(!isVisible)} className='btn-msgnot'><img style={{ width: '1.5rem' }} alt='' src={BellImg} /></button>
				</GradienBox>
				<AnimatePresence mode='wait'>
					{
						isVisible &&
						<motion.div
							initial={{ scale: 0, }}
							animate={{ scale: 1, }}
							exit={{ scale: 0 }}
							key={'notifi'}
							transition={{ ease: "easeInOut"}}
							style={{ position: 'absolute', top: '3.5rem', left: '5rem', width: 'fit-content' }}>
							<NotificationCont data={props.noti} isN={true} />
						</motion.div>

					}
				</AnimatePresence>
			</div>

			<div onClick={() => setNavMo(true)} className='burger'>
				<GradienBox mywidth="49px" myheight="49px" myborder="10px">
					<button className='btn-msgnot'><img style={{ width: '1.5rem' }} src={burger} alt='' />{isFull > 0 && <div className="isFull"></div>}</button>
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
							} to='stream'>
								<ReactSVG src={Stream} />
								{/* <img style={{ width: '1.5rem' }} src={Stream} alt="Stream" /> */}
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
							<a style={{ paddingTop: '10rem' }} href="http://localhost:3001/auth/logout" className='logout'>
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

	useEffect(() => {
		setText(text());
	}, [])
	const text = () => {
		switch (props.type) {
			case "Accepted_request":
				return `${props.username} has accept your request. You are friends now!`;
				break;
			case "game_invitation":
				return `${props.username} has invited you to a game of Ping Pong! Accept or decline the invitation now.`
				break;
			case "GroupInvitation":
				return `Check your Inbox Chat, ${props.username} has invited you in a Group!`;
				break;
			case "Achievement":
				return `Congratulations! You have been awarded a new Archievement.`
				break;
			default:
				return '';
		}
	}
	text();
	return (
		<div id={props.key} className="notification">
			<div className={!props.isRead ? "no-read" : ""}>
				<img src={props.img !== null ? props.img : 'badge'} alt="" />
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
							} src={props.data.avatar} />
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
					<span className='notifi-num'>{data.length}</span>
					{/* notifi.filter((not: any) => not.isRead === 0).length */}
				</div>
				<div className="main-noti">

					{
						!props.isN ?
							data.map((e: any, i: number) => <Invitation key={nanoid()} data={e} />)
							:
							data.map((e: any) => {
								return (<Notification key={nanoid()} username={e.username} type={e.Type} isRead={e.isRead} img={e.avatar ? e.avatar : null} />);
							})
						// onClick={() => handleNotificationClick(index + 1)}
						// props.isN === true ? notifi.map((e: any, index: number) => {
						// 	return (<Notification onClick={() => handleNotificationClick(index + 1)} key={'noti-' + index} isRead={e.isRead} img={test} text={e.text} />);
						// });
					}
				</div>
				<div className="fot-notification">
					{
						props.isN === true ? <button className='mark-read'>Mark all as read</button> : <button className='mark-read dec'>Decline all</button>
						// onClick={markAllAsRead}
					}

				</div>
			</div>
		</GradienBox>
	)
}


export default MsgNot