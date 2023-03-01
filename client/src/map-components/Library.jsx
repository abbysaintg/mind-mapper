import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Library() {
	const [maps, setMaps] = useState([])
    const navigate = useNavigate()

	useEffect(() => {
		fetch(`http://localhost:3000/users/${user_id}/maps`, {
			credentials: 'include',
		})
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

		fetch(`http://localhost:3000/users/${user_id}/maps`, {
			method: 'POST',
            credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ map: { title } }),
		})
			.then((resp) => resp.json())
			.then((map) => {
				addRootNode(map.id)
				handleSelectMap(map.id)
			})
			.catch((error) => console.log(error))
	}

	const addRootNode = (map_id) => {
		const middleX = window.innerWidth / 2
		const middleY = window.innerHeight / 2
		fetch(`http://localhost:3000/users/${user_id}/maps/${map_id}/nodes`, {
			method: 'POST',
            credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				node: {
					label: 'Root Node',
					x: middleX,
					y: middleY,
				},
			}),
		})
			.then((resp) => resp.json())
			.catch((error) => console.log(error))
	}

	const handleSelectMap = (map_id) => {
		navigate(`/users/${user_id}/maps/${map_id}`)
	}

	return (
		<div>
			<h1 className="gradient">My Maps</h1>
			{maps.map((map) => (
				<div key={map.id} onClick={() => handleSelectMap(map.id)}>
					<h3>{map.title}</h3>
				</div>
			))}
			<button onClick={handleAddMap}>Add New Map</button>
		</div>
	)
}

export default Library
