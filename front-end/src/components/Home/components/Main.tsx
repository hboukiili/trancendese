import { useEffect, useState } from 'react'
import Search from './Main/Search'
import MsgNot from './Main/MsgNot'
import GamesMode from './Main/GamesMode'
import BestPlayers from './Main/BestPlayers'
import Hero from './Main/Hero'
import ProfileHome from './Main/ProfileHome'
import { Route, Routes } from 'react-router-dom'
import "./Main.scss"
import GradienBox from '../../../tools/GradienBox'
import avatar from '../../../assets/img/avatar-p.svg'
import Chat from './Main/Chat/Chat'
import Profile, { ProfileProfile, ProfileDown } from './Main/Profile/Profile'
import Settings from './Main/Settings/Settings'
import LeaderBoard from './Main/LeaderBoard/LeaderBoard'
import axios from '../../../Interceptor/Interceptor'

function ActivityContent(props: any) {
	return (
		<div className="activity-x">
			<div className="part1">
				<img src={props.avatar1} alt="" />
				<p>{props.p1}<span>{' ' + (props.isDraw === false ? 'won against ' : 'had a draw with ')}</span>{props.p2}</p>
				{/* <img src={props.avatar2} alt="" /> */}
			</div>
			<div className="time-act">{(props.isDraw === true ? '+60pts' : '+120pts')}</div>
		</div>
	)
}
function Activity() {
	const [isAll, setIsALL] = useState({ boolAll: true });
	const [data, seData] = useState([]);
	console.log(data)
	useEffect(() => {
		axios.get('Home/RecentActivity').then((response) => seData(response.data));
	}, [])
	return (
		<div className='box-box-cont'>
			<h1 className='title-h1'>Recent activity</h1>
			<div className='box-cont'>
				<GradienBox mywidth="397px" myheight="573px" myborder="40px">
					<div className="activity">
						<div className="activity-head">
							<div className="button-switch">
								<div className={!isAll.boolAll ? "switch-back friend-active-btn" : 'switch-back all-active-btn'} />
								<button onClick={() => !isAll.boolAll && setIsALL({ boolAll: true })} className='all-btn'>All</button>
								<button onClick={() => isAll.boolAll && setIsALL({ boolAll: false })} className='friends-btn'>Friends</button>
							</div>

						</div>
						<div className="activity-content">
							{
								isAll.boolAll ?
									(data && data.map((e:any, i) => {
										return (
											e.IsDraw === false ? 
											<ActivityContent key={'activ-' + i} p1={e.Player1} p2={e.Player2} isDraw={e.IsDraw} avatar1={e.Player1Avatar} />
											: <>
											<ActivityContent key={'activ-' + i} p1={e.Player1} p2={e.Player2} isDraw={e.IsDraw} avatar1={e.Player1Avatar} />
											<ActivityContent key={'activ-' + i + '2'} p1={e.Player2} p2={e.Player1} isDraw={e.IsDraw} avatar1={e.Player2Avatar} />
											</>
										)
									})) : <ActivityContent p1='aaizza' p2='arahmoun' time="10:21 AM" avat={avatar} stat='won' />
							}
						</div>
						<button className="activity-footer">
							View more activity
							<svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.49979 6.32707C5.37201 6.32707 5.25222 6.30727 5.14042 6.26765C5.02861 6.22804 4.92479 6.16 4.82896 6.06353L0.396665 1.63124C0.220971 1.45554 0.137276 1.23577 0.145582 0.971905C0.153887 0.708044 0.245568 0.488585 0.420623 0.313529C0.596318 0.137835 0.819929 0.0499871 1.09146 0.0499871C1.36298 0.0499871 1.5866 0.137835 1.76229 0.313529L5.49979 4.05103L9.26125 0.28957C9.43694 0.113876 9.65672 0.0298625 9.92058 0.0375292C10.1844 0.0451958 10.4039 0.137196 10.579 0.313529C10.7547 0.489224 10.8425 0.712835 10.8425 0.984363C10.8425 1.25589 10.7547 1.4795 10.579 1.6552L6.17062 6.06353C6.07479 6.15936 5.97097 6.22741 5.85917 6.26765C5.74736 6.30791 5.62757 6.32771 5.49979 6.32707Z" fill="#00887A" />
							</svg>
						</button>
					</div>
				</GradienBox>
			</div>
		</div>
	);
}

function SlideButton(props: any) {
	const [slideChanger, SetSlideChange] = useState({ circle: props.isAccept ? 'sliderA' : 'sliderD' })
	const handler = () => {
		SetSlideChange({ circle: props.isAccept ? 'sliderA slider-accept' : 'sliderD slider-decline' });
	}
	const Accept = () => (
		<svg width="1rem" height="0.75rem" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M14.5474 0.385803L15.4807 1.31141L5.14475 11.6551L0.0693359 6.57966L1.00266 5.64634L5.14475 9.78843L14.5474 0.385803Z" fill="white" />
		</svg>
	)
	const Decline = () => (
		<svg width="0.813rem" height="0.813rem" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12.75 11.8765C12.8084 11.9348 12.8547 12.0041 12.8863 12.0804C12.9178 12.1566 12.9341 12.2384 12.9341 12.3209C12.9341 12.4035 12.9178 12.4852 12.8863 12.5614C12.8547 12.6377 12.8084 12.707 12.75 12.7653C12.6917 12.8237 12.6224 12.87 12.5461 12.9016C12.4699 12.9332 12.3881 12.9494 12.3056 12.9494C12.2231 12.9494 12.1413 12.9332 12.0651 12.9016C11.9888 12.87 11.9195 12.8237 11.8612 12.7653L6.65211 7.5555L1.44306 12.7653C1.32519 12.8832 1.16532 12.9494 0.998631 12.9494C0.831939 12.9494 0.672074 12.8832 0.554205 12.7653C0.436335 12.6475 0.370117 12.4876 0.370117 12.3209C0.370117 12.1542 0.436335 11.9944 0.554205 11.8765L5.76404 6.66743L0.554205 1.45838C0.436335 1.34051 0.370117 1.18064 0.370117 1.01395C0.370117 0.847259 0.436335 0.687394 0.554205 0.569524C0.672074 0.451655 0.831939 0.385437 0.998631 0.385437C1.16532 0.385437 1.32519 0.451655 1.44306 0.569524L6.65211 5.77936L11.8612 0.569524C11.979 0.451655 12.1389 0.385437 12.3056 0.385437C12.4723 0.385437 12.6322 0.451655 12.75 0.569524C12.8679 0.687394 12.9341 0.847259 12.9341 1.01395C12.9341 1.18064 12.8679 1.34051 12.75 1.45838L7.54018 6.66743L12.75 11.8765Z" fill="white" />
		</svg>
	)

	return (
		<div onClick={handler} className='SlideButton'>
			<div className={slideChanger.circle}>
				{props.isAccept ? <Accept /> : <Decline />}
			</div>
			<div className='btnslide'>
				<div className="button-text">{props.isAccept ? 'Accept' : 'Decline'}</div>
			</div>
		</div>

	);
}


function Invitation(props: any) {
	const stater = (e: any) => {
		props.state(e);
	}
	return (
		<div className="invitation-container">
			<GradienBox zIndex={100000} mywidth="397px" myheight="157.02px" myborder="20px">
				<div className="invitation">
					<div className="close-invi" onClick={() => (stater(false))}>
						<svg width="0.563rem" height="0.563rem" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.795 8.16957C8.83609 8.21065 8.86868 8.25942 8.89091 8.3131C8.91314 8.36678 8.92459 8.42431 8.92459 8.48241C8.92459 8.54051 8.91314 8.59804 8.89091 8.65172C8.86868 8.70539 8.83609 8.75417 8.795 8.79525C8.75392 8.83633 8.70515 8.86892 8.65147 8.89115C8.59779 8.91339 8.54026 8.92483 8.48216 8.92483C8.42406 8.92483 8.36653 8.91339 8.31286 8.89115C8.25918 8.86892 8.21041 8.83633 8.16932 8.79525L4.50258 5.12795L0.835828 8.79525C0.752858 8.87822 0.640326 8.92483 0.522989 8.92483C0.405651 8.92483 0.293119 8.87822 0.210149 8.79525C0.127179 8.71228 0.0805664 8.59975 0.0805664 8.48241C0.0805664 8.36507 0.127179 8.25254 0.210149 8.16957L3.87745 4.50282L0.210149 0.836073C0.127179 0.753102 0.0805664 0.64057 0.0805664 0.523233C0.0805664 0.405895 0.127179 0.293363 0.210149 0.210393C0.293119 0.127423 0.405651 0.0808105 0.522989 0.0808105C0.640326 0.0808105 0.752858 0.127423 0.835828 0.210393L4.50258 3.87769L8.16932 0.210393C8.25229 0.127423 8.36483 0.0808105 8.48216 0.0808105C8.5995 0.0808105 8.71203 0.127423 8.795 0.210393C8.87797 0.293363 8.92459 0.405895 8.92459 0.523233C8.92459 0.64057 8.87797 0.753102 8.795 0.836073L5.1277 4.50282L8.795 8.16957Z" fill="#706A6E" />
						</svg>
					</div>
					<div className="invitation-content">
						<img className='img-invitation' src={avatar} alt="" />
						<p>Camelia has invited you to a game of Ping Pong! Accept or decline the invitation now.</p>
					</div>
					<div className="footer-onvitation">
						<SlideButton isAccept={1} />
						<SlideButton isAccept={0} />
					</div>
				</div>
			</GradienBox>
		</div>
	);
}

function Side2(props: any) {
	return (
		<div className='side2'>
			{
				props.isN === 1 ? <> <ProfileHome /><Activity /></> :
					<ProfileProfile />
			}
		</div>
	)
}

function Main() {
	const [invit, setInvit] = useState(false)
	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: 'auto' }}>
			<div className='main'>
				<div className="side1">
					<div className='top'>
						<Search />
						<MsgNot />
					</div>
					<Routes>
						<Route path="/" element={<><Hero /><GamesMode /><BestPlayers /></>} />
						<Route path="chat" element={<Chat params={false} />} />
						<Route path="chat/:login" element={<Chat params={true} />} />
						<Route path="profile/:login" element={<><Profile /></>} />
						<Route path="settings/" element={<><Settings /></>} />
						<Route path="/leaderBoard" element={<LeaderBoard />} />

					</Routes>
				</div>
				<Routes>
					<Route path="/" element={<Side2 isN={1} />} />
					<Route path="/settings" element={<Side2 isN={1} />} />
					<Route path="/leaderBoard" element={<Side2 isN={1} />} />
					<Route path="chat" element={<Side2 isN={1} />} />
					<Route path="chat/:login" element={<Side2 isN={1} />} />
					<Route path="/profile/:login" element={<Side2 isN={0} />} />
				</Routes>
				{invit && <Invitation state={setInvit} />}
			</div>
			<Routes>
				<Route path="/profile/:login" element={<ProfileDown />} />
			</Routes>
		</div>
	)
}

export default Main