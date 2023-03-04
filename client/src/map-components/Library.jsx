import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { MapContext } from '../App'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

function Library() {
	const { user } = useContext(UserContext)
	const { setMapId } = useContext(MapContext)
	const [maps, setMaps] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [editing, setEditing] = useState(null)
	const [newMapTitle, setNewMapTitle] = useState('')

	useEffect(() => {
		if (!user) return
		fetch(`http://localhost:3000/users/${user.id}/maps`, {
			credentials: 'include',
		})
			.then((resp) => resp.json())
			.then((data) => {
				setMaps(data)
				setLoading(false)
			})
			.catch((error) => console.log('Error:', error))
	}, [user, newMapTitle])

	const handleAddMap = () => {
		fetch(`http://localhost:3000/users/${user.id}/maps`, {
			method: 'POST',
			credentials: 'include',
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
			.catch((error) => console.log(error))
	}

	const handleSelectMap = (mapId) => {
		navigate(`/maps/${mapId}`)
		setMapId(mapId)
	}

	const handleDeleteMap = (mapToDeleteId) => {
		fetch(`http://localhost:3000/users/${user.id}/maps/${mapToDeleteId}`, {
			method: 'DELETE',
			credentials: 'include',
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

	const handleMapNameChange = (newTitle, mapToUpdateId) => {
		fetch(`http://localhost:3000/users/${user.id}/maps/${mapToUpdateId}`, {
			method: 'PATCH',
			credentials: 'include',
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
			.then((updatedMap) => {
                setNewMapTitle('')
                setMaps([...maps, updatedMap])
            })
			.catch((error) => {
				console.log('Error updating node label:', error)
			})
	}

	if (loading) {
		return <div>Loading...</div>
	}
	return (
		<div>
			<h1 className="library-title">My Maps</h1>
			<div className="library">
				{maps.map((map) => {
					if (map.id == editing) {
						return (
							<div className="library-item" key={map.id}>
								<input
									value={editing === map.id ? newMapTitle : map.title}
									onChange={(e) => setNewMapTitle(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleMapNameChange(newMapTitle, map.id)
											setEditing(null)
										}
									}}
								/>
								<EditIcon
									className="icon"
									onClick={() => {
										handleMapNameChange(newMapTitle, map.id)
										setEditing(null)
									}}
								/>
							</div>
						)
					} else {
						return (
							<div className="library-item not-editing" key={map.id} onClick={() => handleSelectMap(map.id)}>
								{map.title}
								<EditIcon
									className="icon"
									onClick={(event) => {
										event.stopPropagation()
										setEditing(map.id)
									}}
								/>
								<DeleteForeverIcon
									className="icon"
									onClick={(event) => {
										event.stopPropagation()
										handleDeleteMap(map.id)
									}}
								/>
							</div>
						)
					}
				})}
				<div className="library-item not-editing" onClick={handleAddMap}>
					Add New Map <AddIcon className="icon" />
				</div>
			</div>
		</div>
	)
}

export default Library
