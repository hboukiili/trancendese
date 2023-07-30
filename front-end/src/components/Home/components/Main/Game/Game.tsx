import './Game.scss'
import Table from './Table'
import DefaultOne from '../../../../../assets/img/avatar.png'
import GradienBox from '../../../../../tools/GradienBox'
function Game() {
    return (
        <div className='GameContainer'>
            <GradienBox mywidth="1201px" myheight="815px" myborder="40px">
                <div className="gameContent">
                    <div className="gameHeader">
                        <div className="Player">
                            <img src={DefaultOne} />
                            <div className="scoreUser">
                                <p>Tchtaibi</p>
                                <div className="score">
                                    <div className="goal"/>
                                    <div className="goal"/>
                                </div>
                            </div>
                        </div>
                        <div className="Player Player2">
                            <img src={DefaultOne} />
                            <div className="scoreUser">
                                <p>Tchtaibi</p>
                                <div className="score">
                                    <div className="goal"/>
                                    <div className="goal"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Tablecont">
                        <div className="TableC">
                            <Table/>
                        </div>
                    </div>
                </div>
            </GradienBox>
        </div>

    )
}
export default Game;