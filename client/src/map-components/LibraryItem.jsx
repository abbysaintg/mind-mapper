import { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

function LibraryItem({ map, handleSelectMap, handleDeleteMap, updateMapName }) {
	const [mapTitle, setMapTitle] = useState(map.title)

	const handleMapNameChange = (newName) => {
		setMapTitle(newName)
		updateMapName(newName, map.id)
	}

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault()
			e.target.blur()
		}
	}

	return (
		<div className="library-item">
			<input value={mapTitle} onChange={(e) => handleMapNameChange(e.target.value)} onKeyDown={handleKeyDown} />
			<div className="library-item-icons">
				<ExitToAppIcon className="icon" onClick={() => handleSelectMap(map.id)} />
				<DeleteForeverIcon
					className="icon"
					onClick={(event) => {
						handleDeleteMap(map.id)
					}}
				/>
			</div>
		</div>
	)
}

export default LibraryItem
