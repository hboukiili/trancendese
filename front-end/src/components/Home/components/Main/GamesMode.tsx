import GradienBox from '../../../../tools/GradienBox'
import "./GamesMode.scss"
import classicI from '../../../../assets/img/classicM.svg'
import blackHole from '../../../../assets/img/BlackHole.svg'
import footBall from '../../../../assets/img/Football.svg'
import aiI from '../../../../assets/img/aiM.svg'
import friendI from '../../../../assets/img/friendM.svg'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

function BOxGame(props: any) {
	return (
		<div>
			<GradienBox over={1} games={true} mywidth="335px" myheight="195px" myborder="40px">
				<div className="ModePlay">
					<div className='Mode1'>
						<h2>{props.titleB}</h2>
						<p>{props.StitleB}</p>
						<Link to={props.linkB} id={props.idA}>
							<GradienBox mywidth="120px" myheight="40px" myborder="15px">
								<div className="playnowbtn">Play now</div>
							</GradienBox>
						</Link>
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
	const GameModesArr = [
		<div className={'gsss'} key={nanoid()}><BOxGame idA='classicA' imgID='classicIMG' classB="classic" titleB="Classic" StitleB='Challenge Random Player' linkB="/game/classic" imgB={classicI} /></div>,
		<div className={'gsss'} key={nanoid()}><BOxGame idA='aiA' imgID='aiIMG' classB="ai" titleB="HK-47 Mode" StitleB='Challenge HK-47' linkB="/game" imgB={aiI} /></div>,
		<div className={'gsss'} key={nanoid()}><BOxGame idA='Foot' imgID='FootIMG' classB="FOOT" titleB="Football Mode" StitleB='Play like a Football Player' linkB="/game/football" imgB={footBall} /></div>,
		<div className={'gsss'} key={nanoid()}><BOxGame idA='BlackHole' imgID='BlackHoleIMG' classB="BLACKHOLE" titleB="Black Hole" StitleB='Play and challenge the Blackholes' linkB="/game/blackhole" imgB={blackHole} /></div>,
		// <div className={'gsss'} key={nanoid()}><BOxGame idA='friendA' imgID='friendIMG' classB="friend" titleB="Friends Mode" StitleB='Social play, easy invites' linkB="#" imgB={friendI} /></div>,
	];
	return (
		<motion.div
			initial={{ y: '100vh' }}
			animate={{ y: 0 }}
			exit={{ y: '100vh' }}
			transition={{delay: 0.2, duration: 0.4}}
			className='box-box-cont'>
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
					navText={[
						'<button class="custom-nav-btn prev-btn"><div class="content-nav"><svg width="0.813rem" height="1.188rem" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1818 2L3 9.84091L11.1818 17" stroke="#F9C690" stroke-width="3" stroke-linecap="round"/></svg></div></button>'
						, 
						'<button class="custom-nav-btn next-btn"><div class="content-nav"><svg width="0.813rem" height="1.188rem" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.81818 17L10 9.15909L1.81818 2" stroke="#F9C690" stroke-width="3" stroke-linecap="round"/></svg></div></button>']}
				>
					{GameModesArr}
				</OwlCarousel>
			</div>
		</motion.div>
	);
}
export default GamesMode;