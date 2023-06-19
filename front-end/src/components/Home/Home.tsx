
import "./Home.scss"
import LeftBar from './components/LeftBar'
import Main from './components/Main'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store'
import { useEffect } from 'react'
import { setAdmin } from '../../features/adminSlice';
import { userType } from '../../interface/interfaces';
import { BrowserRouter as Router, Outlet } from 'react-router-dom'
function Home() {
  const dispatch: AppDispatch = useDispatch()
  const getAdmin: userType | undefined = useSelector((state: any) => {
    const admin = state.users.users.length > 0 ? state.users.users.filter((e: any) => e.admin === true)[0] : undefined;
    return admin
  })

  useEffect(() => {
    if (getAdmin !== undefined) {
      dispatch(setAdmin(getAdmin));
    }
  }, [getAdmin]);
  return (
    <div className='Home'>
      <Router>
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