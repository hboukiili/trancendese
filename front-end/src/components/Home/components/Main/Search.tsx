import "./Search.scss"
import SearImg from "../../../../assets/img/search.svg"
import defaultAvatar from "../../../../assets/img/avatar.png"
import GradienBox from '../../../../tools/GradienBox'
import SBadge from "../../../../assets/img/small-badge.svg"
import bronze from '../../../../assets/img/Badges/Bronze.png'
import silver from '../../../../assets/img/Badges/Silver.png'
import gold from '../../../../assets/img/Badges/Gold.png'
import platinium from '../../../../assets/img/Badges/Platinium.png'
import diamond from '../../../../assets/img/Badges/Diamond.png'
import master from '../../../../assets/img/Badges/Master.png'
import grandMaster from '../../../../assets/img/Badges/GrandMaster.png'
import {nanoid} from 'nanoid'
import { useState, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Link } from 'react-router-dom'
import axios from '../../../../Interceptor/Interceptor'

function SearchContent(props: any) {
	const myBadge = (badge:string): string => {
		switch (badge) {
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
	const SimpeLoop = () => {
		const elements = props.userFound.map((e: any, i: number) =>
			<Link onClick={() => {
				props.set(false);
			}} to={`/profile/${e.username}`} key={nanoid()} className="found">
				<div className={'f-part1 ' + (e.isFriend ? (e.status === true ? "user-active-search" : "user-desactive-search") : 'user-notFriend-search')}>
					<img onError={(e: any) => {
						e.target.src = defaultAvatar;
					}
					} src={e.avatar ? e.avatar : defaultAvatar} alt="" />
					<div className="textInfo">
						<h4>{e.username}</h4>
						<p>{'LEVEL ' + e.level}</p>
					</div>
				</div>
				<div className="f-part2">
					<img src={myBadge(e.badge)} alt="" />
					{/* // should Badge here  remember?? */}
				</div>
			</Link>
		)
		return elements
	}
	return (
		<div className="SearchContent">{
			props.userFound.length > 0 ? SimpeLoop() :
				'No User Found!'
		}
		</div>
	);
}

function Search() {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef(null)
	// const users: any = useSelector((state: any) => state.users.users);
	const [userFound, setUserFound] = useState([]);
	const handleClickOutside = () => {
		setIsVisible(false)
	}
	useOnClickOutside(ref, handleClickOutside);
	function handleChange(event: any) {
		const value = event.target.value;
		if (value.length == 0) {
			setUserFound([]);
			setIsVisible(false)
		}
		else {
			const newUsers = async () => {
				await axios.post('/search', { user: value }).then((resp: any) => setUserFound(resp.data))
				setIsVisible(true)
			}
			newUsers();
			// if (newUsers.length == 0)
			// 	setIsVisible(false)
			// else
			// {
			// 	setUserFound(newUsers);
			// }
		}
	}
	return (
		<>
			{
				isVisible &&
				<div ref={ref} className="searchC">
					<SearchContent set={setIsVisible} userFound={userFound} />
				</div>
			}
			<div ref={ref} className="searchI  nput">
				<GradienBox className="" mywidth="369px" myheight="49px" myborder="20px">
					<div className='cont'>
						<input onChange={handleChange} type='text' placeholder='Search...' className='search-input' />
						<button className='search-btn'>
							<img src={SearImg} alt="search" />
						</button>
					</div>
				</GradienBox>
			</div>
		</>
	)

}

export default Search