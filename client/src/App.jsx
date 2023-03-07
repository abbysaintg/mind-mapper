import React, { createContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './app-components/Navbar'
import Welcome from './app-components/Welcome'
import Library from './map-components/Library'
import Map from './map-components/Map'
import Login from './app-components/Login'
import SignUp from './app-components/SignUp'

export const UserContext = createContext(null)
export const MapContext = createContext(null)

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	const [mapId, setMapId] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		fetch('/api/logged_in')
			.then((response) => response.json())
			.then((data) => {
				if (data.logged_in) {
					setLoggedIn(true)
					setUser(data.user)
				} else {
					console.log("Not currently logged in.")
				}
			})
			.catch((error) => console.log('Error:', error))
	}, [])

	const handleLogin = (user) => {
		setLoggedIn(true)
		setUser(user)
		navigate(`/api/maps`)
	}

	const handleLogout = () => {
		fetch('/api/logout', { method: 'DELETE' })
			.then((response) => {
				if (response.ok) {
					setLoggedIn(false)
					setUser(null)
					setMapId(null)
					navigate(`/login`)
				} else {
					throw new Error('Logout failed')
				}
			})
			.catch((error) => console.log('Error:', error))
	}

	return (
		<div className="app">
			<UserContext.Provider value={{ user, setUser }}>
				<MapContext.Provider value={{ mapId, setMapId }}>
					<Navbar loggedIn={loggedIn} handleLogout={handleLogout}/>
					<Routes>
						<Route path="/" element={<Welcome />} />
						<Route path="/login" element={<Login handleLogin={handleLogin} />} />
						<Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
						<Route path="/maps" element={<Library />} />
						<Route path="/maps/:mapId" element={<Map />} />
					</Routes>
				</MapContext.Provider>
			</UserContext.Provider>
		</div>
	)
}

export default App
