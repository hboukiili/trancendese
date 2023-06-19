import React, {useState} from 'react';
import './Login.scss';
import GradienBox from '../../tools/GradienBox';
import axios from '../../Interceptor/Interceptor'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store'
import { setTrue } from '../../features/isLogin';


function Login() {

    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

    function handleMouseMove(event: any) {
        console.log(event);
        setPosition({ x: event.clientX / 20 , y: event.clientY / 20});
      }
  return (
    <div onMouseMove={handleMouseMove} className="login-container">
        <div   className="log">
        <div style={{
                        right: position ? `${position.x / 16 + 83.375}rem` : `83.375em`,
                        bottom: position ? `${position.y / 16 + 19.0625}rem` : `19.0625rem`
                    }} className='ball' />
            <div className="logo"/>
            <div className="content-log">
                <div className="title-log">
                    <h1>Let's<br />Kick<br />Now !</h1>
                    <h4>It’s Easy and takes less than 20 seconds</h4>
                </div>
                <div className="btn-log">
                    <div className="btn-b">
                        <GradienBox mywidth="216px" myheight="79px" myborder='15px'>
                            <a  href="http://localhost:3001/auth/intra">SIGN IN</a>
                        </GradienBox>
                        <GradienBox mywidth="216px" myheight="79px" myborder='15px'>
                            <a  href="http://localhost:3001/auth/google">SIGN UP</a>
                        </GradienBox>
                    </div>
                    <p>This web app requires a 42intra account for sign up and sign in.</p>
                </div>
            </div>
        </div>

    </div>
  );
}

export default Login;