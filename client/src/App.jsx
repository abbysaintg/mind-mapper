import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './app-components/Login'
import Navbar from './app-components/Navbar'
import Profile from './app-components/Profile'
import Welcome from './app-components/Welcome'
import Library from './map-components/Library'
import Map from './map-components/Map'

function App() {

	return (
		<div className="App">
			<Navbar />
			<div className='app-container'>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/maps" element={<Library />} />
                    <Route path="/maps/:id" element={<Map />} />
                </Routes>
            </div>
		</div>
	)
}

export default App
