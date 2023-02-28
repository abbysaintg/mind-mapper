import { useState } from 'react'
import PaletteIcon from '@mui/icons-material/Palette'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CreateIcon from '@mui/icons-material/Create'

function NodeMenu({ handleDelete }) {
	const [open, toggleMenu] = useState(false)

	return (
		<div className={'menu ' + (open ? 'menu-open' : '')} onClick={() => toggleMenu(!open)}>
			{/* <div className='icon-container'>
                <div className="palette-icon">
                    <PaletteIcon className="icon" />
                </div>
                <div className="delete-icon">
                    <DeleteForeverIcon className="icon" />
                </div>
                <div className="create-icon">
                    <CreateIcon className="icon" />
                </div>
            </div>
			<AddCircleOutlineIcon className="plus" /> */}
            <DeleteForeverIcon onClick={handleDelete} className="icon" />
		</div>
	)
}

export default NodeMenu
