import { lazy } from 'react'
import Search from './Main/Search'
import MsgNot from './Main/MsgNot'
// import GamesMode from './Main/GamesMode'
// import BestPlayers from './Main/BestPlayers'
// import Hero from './Main/Hero'
// import ProfileHome from './Main/ProfileHome'
import { Route, Routes } from 'react-router-dom'
import "./Main.scss"
// import Chat from './Main/Chat/Chat'
// import Profile from './Main/Profile/Profile'
// import ProfileDown from './Main/Profile/ProfileDown'
import Settings from './Main/Settings/Settings'
// import Error404 from './404'
import { AnimatePresence } from 'framer-motion';
import Activity from './Activity';
import Game from './Main/Game/Game'

// const Activity = lazy(() => import('./Activity'));
const ProfileProfile = lazy(() => import('./Main/Profile/ProfileProfile'));
// const Settings = lazy(() => import('./Main/Settings/Settings'));
const LeaderBoard = lazy(() => import('./Main/LeaderBoard/LeaderBoard'));
const ProfileDown = lazy(() => import('./Main/Profile/ProfileDown'));
const Chat = lazy(() => import('./Main/Chat/Chat'));
const ProfileHome = lazy(() => import('./Main/ProfileHome'));
const Error404 = lazy(() => import('./404'));
const Profile = lazy(() => import('./Main/Profile/Profile'));
const GamesMode = lazy(() => import('./Main/GamesMode'));
const BestPlayers = lazy(() => import('./Main/BestPlayers'));
const Hero = lazy(() => import('./Main/Hero'));


function Side2(props: any) {
	return (
		<AnimatePresence mode='wait'>
			<div className='side2'>
				{
					props.isN === 1 ? <> <ProfileHome /><Activity /></> :
						<ProfileProfile />
				}
			</div>
		</AnimatePresence>
	)
}



function Main(props: any) {

	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: 'auto' }}>
			<div className='main'>
				<div className="side1">
					<div className='top'>
						<Search />
						<MsgNot isFull={props.isFull} setIsfull={props.setIsfull} isFullN={props.isFullN} setIsfullN={props.setIsfullN}  socketInvi={props.socketInvi}  />
					</div>
					<Routes>
						<Route path="/" element={<AnimatePresence mode='wait'>
							<Hero />
								<GamesMode />
								<BestPlayers />
								</AnimatePresence>} />
						<Route path="chat" element={<Chat params={false} />} />
						<Route path="chat/:userId" element={<Chat params={true} />} />
						<Route path="profile/:login" element={<><Profile /></>} />
						<Route path="settings/" element={<><Settings /></>} />
						<Route path="/leaderBoard" element={<LeaderBoard />} />
						<Route path="/game" element={<Game isBlackHole={false} isOnline={false} mode={'ai'} />} />
						<Route path="/game/blackhole" element={<Game isBlackHole={true} isOnline={false} mode={'blackhole'} />} />
						<Route path="/game/classic" element={<Game isBlackHole={false} isOnline={true} mode={'classic'} />} />
						<Route path="/game/football" element={<Game isBlackHole={false} isOnline={true} mode={'football'} />} />
						<Route path="/game/friends/:FriendsRoom" element={<Game isBlackHole={false} isOnline={true} mode={'friends'} />} />
						<Route path="/404" element={<Error404 />} />
						<Route path="*" element={<Error404 />} />


					</Routes>
				</div>
				<Routes>
					<Route path="/" element={<Side2 isN={1} />} />
					<Route path="/settings" element={<Side2 isN={1} />} />
					<Route path="/leaderBoard" element={<Side2 isN={1} />} />
					<Route path="chat" element={<Side2 isN={1} />} />
					<Route path="chat/:userId" element={<Side2 isN={1} />} />
					<Route path="/profile/:login" element={<Side2 isN={0} />} />
					<Route path="/404" element={<Side2 isN={1} />} />
					<Route path="*" element={<Side2 isN={1} />} />
				</Routes>

			</div>
			<Routes>
				<Route path="/profile/:login" element={<ProfileDown />} />
			</Routes>
		</div>
	)
}

export default Main