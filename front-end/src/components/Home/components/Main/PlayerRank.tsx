import React from 'react'
import "../Main.scss"
function PlayerRank(props: any) {

  return (
    <div className='bpplayer'>
        <img src={props.award} alt="" className='badgerank' />
        <img src={props.avatar} alt="" className='avatar'/>
        <p>{props.login}</p>
        <p className='point'>{props.points}<span>pts</span></p>
        <p className='ratings'>{props.level.toFixed(1)}</p>
    </div>
  )
}

export default PlayerRank