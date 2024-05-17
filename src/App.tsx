import './App.css'

import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from 'src/pages/home/home';
import Login from 'pages/users/login/login';
import Register from 'pages/users/register/register'
import NewPrediction from './pages/users/newPrediction/newPrediction';
import Logout from './pages/users/logout/logout';
import UserProfile from './pages/users/profile/userProfile';
import Dashboard from './pages/users/dashboard/dashboard';

function App() {

	return (
		<>
			<Router basename={"/calleditprod/"}>
				<Routes>
					{/* <Route path="/" element={<Home />}> */}
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="logout" element={<Logout />} />
						<Route path="newPrediction" element={<NewPrediction />} />
						<Route path="profile/:username" element={<UserProfile />} />
						<Route path="dashboard" element={<Dashboard />} />
					{/* </Route> */}
				</Routes>
			</Router >
		</>
	)
}

export default App
