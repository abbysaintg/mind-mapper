import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { MapContext } from '../App'
import LibraryItem from './LibraryItem'
import AddIcon from '@mui/icons-material/Add'

function Library() {
	const { user } = useContext(UserContext)
	const { setMapId } = useContext(MapContext)
	const [maps, setMaps] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) return
		fetch(`/api/users/${user.id}/maps`)
			.then((resp) => resp.json())
			.then((data) => {
				setMaps(data)
				setLoading(false)
			})
			.catch((error) => console.log('Error:', error))
	}, [user])

	const handleAddMap = () => {
		fetch(`/api/users/${user.id}/maps`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				map: {
					title: 'New Map',
				},
			}),
		})
			.then((resp) => resp.json())
			.then((map) => handleSelectMap(map.id))
			.catch((error) => console.log('Error:', error))
	}

	const handleSelectMap = (mapId) => {
		navigate(`/maps/${mapId}`)
		setMapId(mapId)
	}

	const handleDeleteMap = (mapToDeleteId) => {
		fetch(`/api/users/${user.id}/maps/${mapToDeleteId}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					const updatedMaps = maps.filter((map) => map.id !== mapToDeleteId)
					setMaps(updatedMaps)
				} else {
					throw new Error('Network response was not ok.')
				}
			})
			.catch((error) => console.log('Error:', error))
	}

	const updateMapName = (newTitle, mapToUpdateId) => {
		fetch(`/api/users/${user.id}/maps/${mapToUpdateId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				map: {
					title: newTitle,
				},
			}),
		})
			.then((response) => response.json())
			.catch((error) => console.log('Error:', error))
	}

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className="library-container">
			{maps.map((map) => (
				<LibraryItem key={map.id} map={map} handleSelectMap={handleSelectMap} handleDeleteMap={handleDeleteMap} updateMapName={updateMapName} />
			))}
			<div className="library-item" onClick={handleAddMap}>
				Add New Map <AddIcon className="icon" />
			</div>
		</div>
	)
}

export default Library
