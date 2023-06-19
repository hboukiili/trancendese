import "./Search.scss"
import SearImg from "../../../../assets/img/search.svg"
import GradienBox from '../../../../tools/GradienBox'
import Awardtest from './testBadge.svg'
import { useState, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useSelector } from "react-redux"

function SearchContent(props: any) {
	const SimpeLoop = () => {
		console.log('user ound', props.userFound);
		const elements = props.userFound.map((e: any, i:number) =>
			<a key={'userFound-' + i} href='#' className="found">
				<div className={'f-part1 ' + (e.status === true ? "user-active-search" : "user-desactive-search")}>
					<img src={e.avatar} alt="" />
					<div className="textInfo">
						<h4>{e.login}</h4>
						<p>{'LEVEL ' + e.level}</p>
					</div>
				</div>
				<div className="f-part2">
					<img src={Awardtest} alt="" />
				</div>
			</a>
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
	const users: any = useSelector((state: any) => state.users.users);
	const [userFound, setUserFound] = useState([]);
	const handleClickOutside = () => {
		setIsVisible(false)
	}
	useOnClickOutside(ref, handleClickOutside);
	function handleChange(event: any) {
		const value = event.target.value;
		if (value.length == 0)
		{
			setUserFound([]);
			setIsVisible(false)
		}
		else
		{
			const newUsers = users.filter((e: any) => e.login.includes(value));
			if (newUsers.length == 0)
				setIsVisible(false)
			else
			{
				setIsVisible(true)
				setUserFound(newUsers);
			}
		}
	}
	return (
		<>
			{
				isVisible &&
				<div ref={ref} className="searchC">
					<SearchContent userFound={userFound} />
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