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
import { useSelector } from "react-redux";


function LeftBar() {
  const username = useSelector((state:any) => state.admin).username;
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
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to={'profile/' + username}>
              <ReactSVG src={ProfImg} />
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to='chat'>
              <ReactSVG src={ChatImg} />
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to='leaderBoard'>
              <ReactSVG src={LeaderBoard} />
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? 'nav-icon-act' : 'nav-icon'
            } to='settings'>
              <ReactSVG src={SetfImg} />
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