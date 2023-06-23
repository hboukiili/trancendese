import Login from './components/Login/Login';
import './App.scss';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react'
import Particle from './tools/ParticalComponent';
import Cookies from 'js-cookie';


function App() {
	const [isLogin, setisLogin] = useState(false);
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