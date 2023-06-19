import GradienBox from '../../../../tools/GradienBox'
import "./GamesMode.scss"
import classicI from '../../../../assets/img/classicM.svg'
import aiI from '../../../../assets/img/aiM.svg'
import friendI from '../../../../assets/img/friendM.svg'
import { useState } from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


function BOxGame(props: any) {
	return (
		<div>
			<GradienBox games={true} mywidth="335px" myheight="195px" myborder="40px">
				<div className="ModePlay">
					<div className='Mode1'>
						<h2>{props.titleB}</h2>
						<p>{props.StitleB}</p>
						<a href={props.linkB} id={props.idA}>
							<GradienBox mywidth="120px" myheight="40px" myborder="15px">
								<div className="playnowbtn">Play now</div>
							</GradienBox>
						</a>
					</div>
					<div className={props.classB + ' photoMode'}>
						<img id={props.imgID} src={props.imgB} alt="" />
					</div>
				</div>
			</GradienBox>
		</div>
	);
}


function GamesMode() {
	const [GameModesArr, setGameModesArr] = useState<any[]>([
		<BOxGame key='classicA' idA='classicA' imgID='classicIMG' classB="classic" titleB="Classic" StitleB='Challenge the computer' linkB="#" imgB={classicI} />,
		<BOxGame key='aiA' idA='aiA' imgID='aiIMG' classB="ai" titleB="AI Mode" StitleB='Traditional gameplay' linkB="#" imgB={aiI} />,
		<BOxGame key='aiA2' idA='aiA' imgID='friendIMG' classB="friend" titleB="Friends Mode" StitleB='Social play, easy invites' linkB="#" imgB={friendI} />,
		<BOxGame key='friendA' idA='friendA' imgID='friendIMG' classB="friend" titleB="Friends Mode" StitleB='Social play, easy invites' linkB="#" imgB={friendI} />,
	])


	return (
		<div className='box-box-cont'>
			<h1 className='title-h1'>Games mode</h1>
			<div
				style={{ marginTop: 0, }} 
				className='box-cont gamesmodeCont'>
				<OwlCarousel
					nav={true}
					dots={false}
					className="owl-theme"
					center={true}
					autoplay={true}
					autoplayHoverPause={true}
					animateOut={true}
					smartSpeed={700}
					autoplayTimeout={3000}
					loop
					navText={['<button class="custom-nav-btn next-btn"><div class="content-nav"><svg width="0.813rem" height="1.188rem" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.81818 17L10 9.15909L1.81818 2" stroke="#F9C690" stroke-width="3" stroke-linecap="round"/></svg></div></button>','<button class="custom-nav-btn prev-btn"><div class="content-nav"><svg width="0.813rem" height="1.188rem" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1818 2L3 9.84091L11.1818 17" stroke="#F9C690" stroke-width="3" stroke-linecap="round"/></svg></div></button>']}
				// responsive={{ 0: { items: 1 }, 768: { items: 3 } }}
				>
					{GameModesArr}
				</OwlCarousel>
			</div>
		</div>
	);
}
export default GamesMode;