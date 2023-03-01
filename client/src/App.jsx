import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './app-components/Navbar'
import Profile from './app-components/Profile'
import Welcome from './app-components/Welcome'
import Library from './map-components/Library'
import Map from './map-components/Map'
import LoginForm from './app-components/Login'
import SignUp from './app-components/SignUp'

function App() {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch('http://localhost:3000/logged_in')
			.then((response) => response.json())
			.then((data) => {
				if (data.logged_in) {
					setUser(data.user)
				}
				setIsLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setIsLoading(false)
			})
	}, [])

	const handleLogin = (user) => {
		setUser(user)
	}

	const handleLogout = () => {
		fetch('http://localhost:3000/logout', { method: 'DELETE' })
			.then((response) => {
				if (response.ok) {
					setUser(null)
				} else {
					throw new Error('Logout failed')
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="app">
			<Navbar user={user} handleLogout={handleLogout} />
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/maps" element={<Library user={user}/>} />
				<Route path="/maps/:id" element={<Map user={user}/>} />
				<Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
				<Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
			</Routes>
		</div>
	)
}

export default App
