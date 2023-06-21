import GradienBox from '../../../../tools/GradienBox'
import "../Main.scss"
import RankTable from './RankTable'
import trophet from '../../../../assets/img/trophet.svg'

function BestPlayers() {

  return (
    <div className='box-box-cont' style={{marginTop: '-0.5rem'}}>
        <h1 className='title-h1'>Best players</h1>
        <div className='box-cont' style={{marginTop: '1.5625rem'}}>
            <GradienBox mywidth="1201px" myheight="273px" myborder="40px">
              <img src={trophet} alt="" className='trophet' />
              <div className='bp-cont'>
                <RankTable/>
              </div>
            </GradienBox>
        </div>
    </div>
  )
}

export default BestPlayers