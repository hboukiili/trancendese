import GradienBox from '../../../tools/GradienBox'
import { useEffect, useState } from 'react'
import axios from '../../../Interceptor/Interceptor'
import defaultAvatar from '../../../assets/img/avatar.png'
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'
function ActivityContent(props: any) {
	return (

		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ delay: ((props.id / 10) + 0.1), duration: 0.1 }}
			className="activity-x">

			<div className="part1">
				<Link to={'/profile/' + props.p1}><img src={props.avatar1 ? props.avatar1 : defaultAvatar} onError={(e: any) => {
					e.target.src = defaultAvatar;
				}
				} alt="" /></Link>

				<p>{props.p1}<span>{' ' + (props.isDraw === false ? 'won against ' : 'had a draw with ')}</span>{props.p2}</p>
			</div>
			<div className="time-act">{(props.isDraw === true ? '+60pts' : '+120pts')}</div>
		</motion.div>
	)
}

function Activity() {
	const [isAll, setIsALL] = useState({ boolAll: true });
	const [data, seData] = useState([]);
	useEffect(() => {
		axios.get('Home/RecentActivity').then((response) => seData(response.data));
	}, [])
	const calc = 555;


	return (<motion.div
		initial={{ x: '100vw' }}
		animate={{ x: 0 }}
		exit={{ x: '100vw' }}
		transition={{ delay: 0.2, duration: 0.5 }} className="recentActivity">
		<div className='box-box-cont'>
			<h1 className='title-h1'>Recent activity</h1>
			<div className='box-cont'>
				<GradienBox minh={'505px'} vh={calc} mywidth="397px" myheight="573px" myborder="40px">
					<div className="activity">
						<div className="activity-head">
							<div className="button-switch">
								<div className={!isAll.boolAll ? "switch-back friend-active-btn" : 'switch-back all-active-btn'} />
								<button onClick={() => !isAll.boolAll && setIsALL({ boolAll: true })} className='all-btn'>All</button>
								<button onClick={() => isAll.boolAll && setIsALL({ boolAll: false })} className='friends-btn'>Friends</button>
							</div>

						</div>
						<div className="activity-content">
							<AnimatePresence key={'Act-mode'} mode='sync'>
								{
									isAll.boolAll ?
										(data && data.map((e: any, i) => {
											return (
												e.IsDraw === false ?
													<div key={'activity-' + i}><ActivityContent side={'-'} id={i} p1={e.Player1} p2={e.Player2} isDraw={e.IsDraw} avatar1={e.Player1Avatar} /></div>
													:
													<div key={'activity-draw' + i}><ActivityContent side={'-'} id={i} p1={e.Player1} p2={e.Player2} isDraw={e.IsDraw} avatar1={e.Player1Avatar} /></div>
											)
										})) : (data && data.filter((e: any) => e.AreFriends === true)
											.map((e: any, i) => {
												var index = i;
												if (i > 6)
													index = 6;
												return (
													e.IsDraw === false ?
														<div key={'activity-friend' + i}><ActivityContent side={''} id={index} p1={e.Player1} p2={e.Player2} isDraw={e.IsDraw} avatar1={e.Player1Avatar} /></div>
														:
														<div key={'activity-friend-draw' + i}><ActivityContent side={''} id={index} p1={e.Player1} p2={e.Player2} isDraw={e.IsDraw} avatar1={e.Player1Avatar} /></div>
												)
											}
											))
								}
							</AnimatePresence>
						</div>
					</div>
				</GradienBox>
			</div>
		</div>
	</motion.div>);
}
export default Activity;