import { useState, useRef, useEffect } from 'react'
import test from '../../../../assets/img/test.svg'
import "./MsgNot.scss"
import inviFriend from "../../../../assets/img/invitation-friend.svg"
import BellImg from "../../../../assets/img/bell.svg"
import GradienBox from '../../../../tools/GradienBox'
import { useOnClickOutside } from 'usehooks-ts'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store'
import { getNotification } from '../../../../features/notificationsSlice'
import axios from 'axios'
function MsgNot() {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef(null)
	const handleClickOutside = () => {
		setIsVisible(false)
	}
	useOnClickOutside(ref, handleClickOutside)
	return (
		<div className='msgNot-cont' ref={ref}>
			<GradienBox mywidth="49px" myheight="49px" myborder="10px">
				<button className='btn-msgnot'><img style={{ width: '1.5rem' }} src={inviFriend} alt='' /></button>
			</GradienBox>
			<GradienBox mywidth="49px" myheight="49px" myborder="10px">
				<button onClick={() => setIsVisible(!isVisible)} className='btn-msgnot'><img style={{ width: '1.5rem' }} alt='' src={BellImg} /></button>
			</GradienBox>
			{
				isVisible && <div style={{ position: 'absolute', top: '4.7rem', width: 'fit-content' }}>
					<NotificationCont />
				</div>
			}

		</div>
	)
}
function Notification(props: any) {
	const handleClick = () => {
		props.onClick();
	};

	return (
		<div id={props.id} className="notification" onClick={handleClick}>
			<div className={!props.isRead ? "no-read" : ""}>
				<img src={props.img} alt="" />
			</div>
			<div className="noti-text">{props.text}</div>
		</div>
	);
}
function NotificationCont() {

	const [isEffect, setIsEffect] = useState(false);
	const DataNotifications: any = useSelector((state: any) => state.notification);
	console.log('notification :', DataNotifications);
	const notifi = DataNotifications.notifications;

	const dispatch: AppDispatch = useDispatch()

	const markAllAsRead = async () => {
		const updatedNotifications = notifi
			.filter((not: any) => not.isRead === 0)
			.map((not: any) => ({
				...not,
				isRead: 1,
			}));
		try {
			for (const notification of updatedNotifications) {
				const response = await axios.patch(`http://localhost:3001/notifications/${notification.id}`, {
					isRead: 1,
				});
				// console.log(response.data);
			}
			setIsEffect(!isEffect);
			// console.log('updated notifications:', updatedNotifications);
		} catch (error) {
			// console.error(error);
		}
	};
	const handleNotificationClick = async (objectId: number) => {
		try {
			const updatedData = {
				isRead: 1,
			};
			const response = await axios.patch(`http://localhost:3001/notifications/${objectId}`, updatedData);
			setIsEffect(!isEffect);
			// console.log(response.data);
		} catch (error) {
			// console.error(error);
		}


	};
	useEffect(() => {
		dispatch(getNotification());
	}, [isEffect]);
	return (

		<GradienBox absolute={1} mywidth="316px" myheight="408.98px" myborder="20px">
			<div className="notification-container">
				<div className="head-noti-container">
					<div className="notication-head">NOTIFICATIONS</div>
					<span className='notifi-num'>{notifi.filter((not: any) => not.isRead === 0).length}</span>
				</div>
				<div className="main-noti">
					{notifi.map((e: any, index: number) => {
						return (<Notification onClick={() => handleNotificationClick(index + 1)} key={'noti-' + index} isRead={e.isRead} img={test} text={e.text} />);
					})}
				</div>
				<div className="fot-notification">
					<button onClick={markAllAsRead} className='mark-read'>Mark all as read</button>
				</div>
			</div>
		</GradienBox>

	)
}


export default MsgNot