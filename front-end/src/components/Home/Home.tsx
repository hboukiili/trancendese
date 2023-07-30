
import "./Home.scss"
import LeftBar from './components/LeftBar'
import Main from './components/Main'
import { BrowserRouter as Router, Outlet } from 'react-router-dom'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../../store/store"
import { getAdmin } from "../../features/adminSlice"
import { get2FA } from "../../features/2FA"
import { useEffect, Suspense } from 'react'


function Home(props: any) {

  const dispatch: AppDispatch = useDispatch();
  const DataLoader = useSelector((state: any) => state.admin).isLoader;
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAdmin());
      await dispatch(get2FA());
      if (!DataLoader)
        fetchData();
    };
    fetchData();
  }, []);

  return (
    <div className='Home'>
      <Router>
        {!DataLoader && <Loading />}
        <div className="container-home">
          <LeftBar />
          <Suspense fallback={<><Loading /></>}>
            <Main socketInvi={props.socketInvi} setInvi={props.setInv} setNoti={props.setNoti} invitations={props.invitations} notifications={props.notifications} />
          </Suspense>
          <Outlet />
        </div>
      </Router>
    </div>
  );
}

export default Home