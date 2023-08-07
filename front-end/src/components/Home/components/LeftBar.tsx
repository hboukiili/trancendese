import "./LeftBar.scss"
import LogoImg from "../../../assets/img/logo.svg";
import LogoutImg from "../../../assets/img/Logout.svg";
import HomeImg from "../../../assets/img/Home.svg";
import { ReactSVG } from 'react-svg';
import ProfImg from "../../../assets/img/profile.svg";
import SetfImg from "../../../assets/img/Settings.svg";
import ChatImg from "../../../assets/img/chat.svg";
import LeaderBoard from "../../../assets/img//leaderBoard.svg";
import { NavLink } from "react-router-dom";
// import axios from '../../../Interceptor/Interceptor'
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function LeftBar() {
  const username = useSelector((state:any) => state.admin).username;
  // const [Login, setLogin] = useState('')
  // useEffect(() => {
  //   axios.get('/Home/Hero').then((response) => setLogin(response.data))
  // }, [])
  return (
    <div className="bar-left">
      <div className='left-bar-container'>
        <div className="left-bar">
          <img className='logoo' src={LogoImg} alt="logo" />
          <ul>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to='/'>
              <ReactSVG src={HomeImg} />
              {/* <img style={{ width: '1.5rem' }} src={HomeImg} alt="Home" /> */}
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to={'profile/' + username}>
              <ReactSVG src={ProfImg} />
              {/* <img style={{ width: '1.5rem' }} src={ProfImg} alt="Profile" /> */}
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to='chat'>
              <ReactSVG src={ChatImg} />
              {/* <img style={{ width: '1.5rem' }} src={ChatImg} alt="Chat" /> */}
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to='leaderBoard'>
              <ReactSVG src={LeaderBoard} />
              {/* <img style={{ width: '1.5rem' }} src={LeaderBoard} alt="Leader Board" /> */}
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to='settings'>
              <ReactSVG src={SetfImg} />
              {/* <img style={{ width: '1.5rem' }} src={SetfImg} alt="Settings" /> */}
            </NavLink>
          </ul>
          <a href={`${import.meta.env.VITE_URL + import.meta.env.VITE_PORT}/auth/logout`} className='logout'>
            <img style={{ width: '2.5rem' }} src={LogoutImg} alt="" />
          </a>
        </div>
      </div>
    </div>

  );
}

export default LeftBar;