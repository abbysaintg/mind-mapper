import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Library() {

	useEffect(() => {
		fetch('http://localhost:3000/maps')
			.then((resp) => resp.json())
			.then((data) => {
				console.log('Map Library:', data)
				setMaps(data)
			})
			.catch((error) => console.log('Error:', error))
	}, [])

	const handleAddMap = () => {
		const title = prompt('Enter a title for your new map')
		if (!title) return

		fetch('http://localhost:3000/maps', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title }),
		})
			.then((resp) => resp.json())
			.then((data) => {
				mapSelect(data)
			})
			.catch((error) => console.log(error))
	}

	const mapSelect = (map) => {
		navigate(`/maps/${map.id}`) // Navigate to map/:id page
	}

	const navigate = useNavigate()

	return (
		<div>
			<h1>My Maps</h1>
			<ul>
				{maps.map((map) => (
					<li key={map.id}>
						<button onClick={() => mapSelect(map)}>{map.title}</button>
					</li>
				))}
			</ul>
			<button onClick={handleAddMap}>Add New Map</button>
		</div>
	)
}

export default Library
