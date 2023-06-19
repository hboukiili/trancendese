 import "./LeftBar.scss"
import LogoImg from "../../../assets/img/logo.svg";
import LogoutImg from "../../../assets/img/Logout.svg";
import HomeImg from "../../../assets/img/Home.svg";
import ProfImg from "../../../assets/img/profile.svg";
import SetfImg from "../../../assets/img/Settings.svg";
import ChatImg from "../../../assets/img/chat.svg";
import Stream from "../../../assets/img/stream.svg";
import LeaderBoard from "../../../assets/img//leaderBoard.svg";
import { Link } from "react-router-dom";

function LeftBar() {
  return (
    <div className="bar-left">
      <div className='left-bar-container'>
        <div className="left-bar">
          <img className='logoo' src={LogoImg} alt="logo" />
          <ul>
            <Link className='active' to='/'><img style={{ width: '1.5rem' }} src={HomeImg} alt="Home" /></Link>
            <Link className='desactive' to='profile'><img style={{ width: '1.5rem' }} src={ProfImg} alt="Profile" /></Link>
            <Link className='desactive' to='chat'><img style={{ width: '1.5rem' }} src={ChatImg} alt="Chat" /></Link>
            <Link className='desactive' to='stream'><img style={{ width: '1.5rem' }} src={Stream} alt="Stream" /></Link>
            <Link className='desactive' to='leaderBoard'><img style={{ width: '1.5rem' }} src={LeaderBoard} alt="Leader Board" /></Link>
            <Link className='desactive' to='settings'><img style={{ width: '1.5rem' }} src={SetfImg} alt="Settings" /></Link>
          </ul>
          <button className='logout'>
            <img style={{ width: '2.5rem' }} src={LogoutImg} alt="" />
          </button>
        </div>
      </div>
    </div>

  );
}

export default LeftBar;