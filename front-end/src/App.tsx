import Login from './components/Login/Login';
import './App.scss';
import Home from './components/Home/Home';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUsers } from './features/usersSlice'
// import { getNotification } from './features/notificationsSlice'
import { useEffect, useRef, useState } from 'react'
// import { AppDispatch } from './store/store'
import Particle from './tools/ParticalComponent';
// import { getMessage } from './features/messageSlice';
// import axios from './Interceptor/Interceptor';
import Cookies from 'js-cookie';


function App() {
	// const dispatch: AppDispatch = useDispatch()
	const [isLogin, setisLogin] = useState(true);
	useEffect(() => {
		const token = Cookies.get('isAuthenticated');
		console.log(token);
		if (token === 'true') {
			setisLogin(true);
		}
	},[]);

	return (
		<div className="App">
			<Particle />
			{
				!isLogin ? <Login /> : <Home />
			}
		</div>
	);
}

export default App;