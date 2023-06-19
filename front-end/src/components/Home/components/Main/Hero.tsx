import GradienBox from '../../../../tools/GradienBox'
import PlayImg from "../../../../assets/img/Play.svg"
import "./Hero.scss"
import axios from '../../../../Interceptor/Interceptor'
import { useEffect, useState } from 'react';

function Hero() {
  
  const [LoginHero, setHero] = useState('')
  useEffect(()=>{
    axios.get('/Hero').then(( response ) => setHero(response.data))
  }, [])
  
  return (
    <GradienBox mywidth="1201px" myheight="173px" myborder="40px">
      <div className='hero-cont'>
        <div className='part1'>
          <h1 style={{ textTransform: 'capitalize' }}>{LoginHero && 'Hello ! ' + LoginHero + '.'}</h1>
          <p>Ready for a gaming surprise ? Click 'Play' to start a random game and see what awaits !</p>
        </div>
        <a className='playhero' href='/#' >
          <div className="backgroundA"></div>
          <div className="contA">
            <h4>Play</h4>
            <img alt='' src={PlayImg} />
          </div>
        </a>
      </div>
    </GradienBox>
  )
}

export default Hero