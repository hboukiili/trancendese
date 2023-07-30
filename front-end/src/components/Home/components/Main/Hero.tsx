import GradienBox from '../../../../tools/GradienBox'
import PlayImg from "../../../../assets/img/Play.svg"
import "./Hero.scss"
import axios from '../../../../Interceptor/Interceptor'
import { useEffect, useState, useMemo } from 'react';
import { motion} from 'framer-motion';

function Hero() {
  const [loginHero, setHero] = useState('');

  useEffect(() => {
    axios.get('/Home/Hero').then((response) => setHero(response.data));
  }, []);

  return (
    <motion.div
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      exit={{ y: '100vh' }}
      transition={{ duration: 0.4 }}
      style={{marginTop: '6.7rem'}}
    >
      <GradienBox mywidth="1201px" myheight="173px" myborder="40px">
        <div className='hero-cont'>
          <div className='part1'>
            <h1 style={{ textTransform: 'capitalize' }}>{loginHero && 'Hello ! ' + loginHero + '.'}</h1>
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
    </motion.div>
  );
}

export default Hero;