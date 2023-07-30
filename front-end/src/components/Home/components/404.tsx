import guyPong from '../../../assets/img/Pg.svg'
import BackToHome from './BackToHome'
function Error404() {

    return (
        <div style={{marginTop: '5rem'}} className="E404">
            <h1>404</h1>
            <img src={guyPong} alt="404"  />
            <p>OOPS!! Something Went Wrong.</p>
            <BackToHome/>
        </div>
    )
}
export default Error404;