import "../Main.scss"
import { Link } from "react-router-dom"
import defaultAvatar from '../../../../assets/img/avatar.png'
function PlayerRank(props: any) {

  return (
    <div className='bpplayer'>
      <img src={props.award} alt="badge" className='badgerank' />
      <Link to={'/profile/' + props.login}><img onError={(e) => {
        e.target.src = defaultAvatar;
      }}
        src={props.avatar} alt="" className='avatar' /></Link>
      <p>{props.login}</p>
      <p className='point'>{props.points}<span>pts</span></p>
      <p className='ratings'>{props.level.toFixed(1)}</p>
    </div>
  )
}

export default PlayerRank