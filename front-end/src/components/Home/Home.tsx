
import "./Home.scss"
import LeftBar from './components/LeftBar'
import Main from './components/Main'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Outlet } from 'react-router-dom'
import Loading from '../../components/Loading'
function Home() {

  var IsLoading = useSelector((state: any) => (state.isLoading)).isLoading;
  return (
    <div className='Home'>
      <Router>
        { IsLoading && <Loading/>}
        <div className="container-home">
          <LeftBar />
          <Main />
          <Outlet />
        </div>
      </Router>
    </div>
  );
}

export default Home