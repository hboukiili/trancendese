import React, { useState } from 'react';
import './Login.scss';
import axios from '../../Interceptor/Interceptor'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store'
import { setTrue } from '../../features/isLoading';
import { ReactSVG } from 'react-svg'
import I42 from '../../assets/img/42.svg'
import google from '../../assets/img/google.svg'
import { motion, AnimatePresence } from 'framer-motion';

const LoginBtn = (props: any) => {
    const [isHover, setHover] = useState<object>({ opacity: 1, x: 0 });
    const [isHoverIMG, setHoverIMG] = useState<object>({ opacity: 1, scale: 1, x: 0 });
    const handleHover = () => {
        setHover({ opacity: 0, x: '-100%' });
        setHoverIMG({ opacity: 0.5, scale: 5, x: '-5rem', rotate: 20 });
    }
    const handleHoverEnd = () => {
        setHover({ opacity: 1, x: 0 });
        setHoverIMG({ opacity: 1, scale: 1, x: 0 })
    }
    return (
        <AnimatePresence mode='wait'>
            <motion.a
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverEnd}
                onClick={handleHover}
                className='btnsLogin' href={props.link}>
                <div className="btnCon">

                    <motion.h4
                        initial={isHover}
                        animate={isHover}
                        transition={{ duration: 0.5}}
                    >{props.title}</motion.h4>
                    <motion.img
                        initial={isHoverIMG}
                        animate={isHoverIMG}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className={props.classImg ? 'I42' : 'google'} src={props.img} />
                </div>
            </motion.a>
        </AnimatePresence>
    )
}

function Login() {

    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

    function handleMouseMove(event: any) {
        setPosition({ x: event.clientX / 20, y: event.clientY / 20 });
    }
    return (
        <div onMouseMove={handleMouseMove} className="login-container">
            <div className="log">
                <div style={{
                    right: position ? `${position.x / 16 + 83.375}rem` : `83.375em`,
                    bottom: position ? `${position.y / 16 + 19.0625}rem` : `19.0625rem`
                }} className='ball' />
                <div className="logo" />
                <div className="content-log">
                    <div className="title-log">
                        <h1>Let's<br />Kick<br />Now !</h1>
                        <h4>It’s Easy and takes less than 20 seconds</h4>
                    </div>
                    <div className="btn-log">
                        <div className="btn-b">
                            <LoginBtn classImg={1} img={I42} title={'Continue with'} link={`${import.meta.env.VITE_URL + import.meta.env.VITE_PORT}/auth/intra`} />
                            <LoginBtn classImg={0} img={google} title={'Continue with'} link={`${import.meta.env.VITE_URL + import.meta.env.VITE_PORT}/auth/google`} />
                        </div>
                        <p>This web app requires a 42intra account for sign up and sign in.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;