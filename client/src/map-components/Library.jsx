import { useEffect, useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { MapContext } from '../App'

function Library() {
	const { user } = useContext(UserContext)
	const [maps, setMaps] = useState([])
    const { setMapId } = useContext(MapContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) return // add null check here
		fetch(`http://localhost:3000/users/${user.id}/maps`, {
			credentials: 'include',
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log('Map Library:', data)
				setMaps(data)
			})
			.catch((error) => console.log('Error:', error))
	}, [user])

	const handleAddMap = () => {
		const title = prompt('Enter a title for your new map')
		if (!title) return

		fetch(`http://localhost:3000/users/${user.id}/maps`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				map: {
					title,
				},
			}),
		})
			.then((resp) => resp.json())
			.then((map) => handleSelectMap(map.id))
			.catch((error) => console.log(error))
	}

	const handleSelectMap = (mapId) => {
		navigate(`/maps/${mapId}`)
		setMapId(mapId)
	}
	return (
		<div>
			{/* <h1 className="gradient">{user.name}'s Maps</h1> */}
			{maps.map((map) => (
				<div
					className="gradient"
					key={map.id}
					onClick={() => {
						handleSelectMap(map.id)
					}}>
					<h3>{map.title}</h3>
				</div>
			))}
			<button onClick={handleAddMap}>Add New Map</button>
		</div>
	)
}

export default Library
