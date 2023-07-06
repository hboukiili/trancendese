import "../Main.scss"
import { Link } from "react-router-dom"
function PlayerRank(props: any) {

  return (
    <div className='bpplayer'>
      <img src={props.award} alt="" className='badgerank' />
      <Link to={'/profile/' + props.login}><img src={props.avatar} alt="" className='avatar' /></Link>

      <p>{props.login}</p>
      <p className='point'>{props.points}<span>pts</span></p>
      <p className='ratings'>{props.level.toFixed(1)}</p>
    </div>
  )
}

export default PlayerRank