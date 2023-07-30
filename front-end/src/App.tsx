import Login from './components/Login/Login';
import './App.scss';
import Home from './components/Home/Home';
import { useEffect, useState, Suspense, lazy } from 'react';
import Particle from './tools/ParticalComponent';
import Cookies from 'js-cookie';
import axios from './Interceptor/Interceptor'
import { seIsDown } from './features/ServerDown'
import { getToken } from './features/SocketToken'
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store'
// import Secure from '';
import { io } from 'socket.io-client';
import GradienBox from './tools/GradienBox';
import { motion, AnimatePresence } from 'framer-motion';
// const Home = lazy(() => import('./components/Home/Home'));
const Secure = lazy(() => import('./Secure'));
// const Particle = lazy(() => import('./tools/ParticalComponent'));

function SlideButton(props: any) {
	const [slideChanger, SetSlideChange] = useState({ circle: props.isAccept ? 'sliderA' : 'sliderD' })
	const handler = () => {
		const PostData = async () => {
			await axios.post((props.isAccept ? '/AcceptRequest' : '/CancelRequest'), { FriendshipId: props.data });
		}
		SetSlideChange({ circle: props.isAccept ? 'sliderA slider-accept' : 'sliderD slider-decline' });
		PostData();
		setTimeout(() => { props.set(false) }, 500);
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
type InvitationFunc = {
	state: any,
	data: invitationRequest
}
function Invitation({ state, data }: InvitationFunc) {
	const stater = (e: boolean) => {
		state(e);
	}
	return (
		<motion.div
			initial={{ y: '-100vh', opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="invitation-container">
			<GradienBox zIndex={100000} mywidth="397px" myheight="157.02px" myborder="20px">
				<div className="invitation">
					<div className="close-invi" onClick={() => {
						setTimeout(() => {
							stater(false);
						}, 300)
					}}>
						<svg width="0.563rem" height="0.563rem" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.795 8.16957C8.83609 8.21065 8.86868 8.25942 8.89091 8.3131C8.91314 8.36678 8.92459 8.42431 8.92459 8.48241C8.92459 8.54051 8.91314 8.59804 8.89091 8.65172C8.86868 8.70539 8.83609 8.75417 8.795 8.79525C8.75392 8.83633 8.70515 8.86892 8.65147 8.89115C8.59779 8.91339 8.54026 8.92483 8.48216 8.92483C8.42406 8.92483 8.36653 8.91339 8.31286 8.89115C8.25918 8.86892 8.21041 8.83633 8.16932 8.79525L4.50258 5.12795L0.835828 8.79525C0.752858 8.87822 0.640326 8.92483 0.522989 8.92483C0.405651 8.92483 0.293119 8.87822 0.210149 8.79525C0.127179 8.71228 0.0805664 8.59975 0.0805664 8.48241C0.0805664 8.36507 0.127179 8.25254 0.210149 8.16957L3.87745 4.50282L0.210149 0.836073C0.127179 0.753102 0.0805664 0.64057 0.0805664 0.523233C0.0805664 0.405895 0.127179 0.293363 0.210149 0.210393C0.293119 0.127423 0.405651 0.0808105 0.522989 0.0808105C0.640326 0.0808105 0.752858 0.127423 0.835828 0.210393L4.50258 3.87769L8.16932 0.210393C8.25229 0.127423 8.36483 0.0808105 8.48216 0.0808105C8.5995 0.0808105 8.71203 0.127423 8.795 0.210393C8.87797 0.293363 8.92459 0.405895 8.92459 0.523233C8.92459 0.64057 8.87797 0.753102 8.795 0.836073L5.1277 4.50282L8.795 8.16957Z" fill="#706A6E" />
						</svg>
					</div>
					<div className="invitation-content">
						<img className='img-invitation' src={data.sender.avatar} alt="" />
						<p>{`${data.sender.username} has sent you a friend request! Accept or decline the invitation now.`}</p>
					</div>
					<div className="footer-onvitation">
						<SlideButton set={stater} data={data.FriendshipId} isAccept={1} />
						<SlideButton set={stater} data={data.FriendshipId} isAccept={0} />
					</div>
				</div>
			</GradienBox>
		</motion.div>
	);
}

type invitationRequest = {
	FriendshipId: number;
	ReceiverId: string;
	sender: {
		UserId: string,
		avatar: string,
		username: string,
	}

}

function App() {
	// const data:any = useSelector((state:any) => state.admin)
	const [invit, setInvit] = useState(false)
	const dispatch: AppDispatch = useDispatch()
	const [isLogin, setisLogin] = useState(false);
	const [isSecure, setSecure] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const isDownState = useSelector((state: any) => state.isDown);
	const tokenTest = useSelector((state: any) => state.token);
	const [token, setToken] = useState(tokenTest);
	const [invitationRequest, setInviRequest] = useState<invitationRequest>({ FriendshipId: 0, ReceiverId: '0', sender: { UserId: '', avatar: '', username: '', } });


	useEffect(() => {
		const tesServer = async () => {
			if (isDownState.isDown === true) {
				await axios.get('/').then((resp) => {
					dispatch(seIsDown(false));
				}).catch(error => {
					// if (error.request)
					dispatch(seIsDown(true));
					// tesServer();
				})
			}

		}
		tesServer();
		const token = Cookies.get('isAuthenticated');
		if (token === 'true') {
			setisLogin(true);
		}
	}, []);
	useEffect(() => {
		setIsDown(isDownState.isDown);
	}, [isDownState.isDown])

	useEffect(() => {
		setToken(tokenTest.token)
	}, [tokenTest])

	useEffect(() => {
		const CheckFa = async () => {
			await axios.get('/auth/isFA-enabled').then((rsp) => setSecure(rsp.data.FA_ON))
		}
		CheckFa();
		const GetToken = async () => {
			if (isLogin) {
				dispatch(getToken());
			}
		}
		GetToken();
	}, [isLogin])

	useEffect(() => {
		if (token) {
			console.log('here');
			const socket = io('http://localhost:3001/notification', {
				extraHeaders: {
					Authorization: `Bearer ${token}`,
				}
			});
			socket.on('connect', () => {
				console.log('Socket.IO connected.');
			});

			socket.on('request', (data: invitationRequest) => {
				setInviRequest(data);
				setInvit(true);
				setTimeout(() => {
					setInvit(false);
				}, 30000)
				console.log('Received notification:', data);

			});

			socket.on('disconnect', () => {
				console.log('Socket.IO disconnected.');
			});

			return () => {
				socket.disconnect();
			};
		}
	}, [token]);
	return (
		<div className="App">
			{/* <Suspense fallback={<><Loading /></>}> */}
				<Particle />
				{
					isDown ? <Loading /> :
						!isLogin ? <Login /> : (!isSecure ? <><Home socketInvi={setInvit} /><AnimatePresence mode='wait'>{invit && <Invitation data={invitationRequest} state={setInvit} />}</AnimatePresence></> : <Secure setSec={setSecure} />)
				}
			{/* </Suspense> */}
		</div>
	);
}

export default App;