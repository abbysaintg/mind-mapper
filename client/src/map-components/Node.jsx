import { useEffect, useState, useRef } from 'react'
import DraggableCore from 'react-draggable'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Node({ mapId, node, nodes, handleAddNode, handleDeleteNode, updateNodePosition }) {
	const [label, setLabel] = useState(node.label)
	const [position, setPosition] = useState({ x: node.x, y: node.y })
	const divRef = useRef(null)

	const handleMove = (newPosition) => {
		setPosition(newPosition)
		updateNodePosition(newPosition, node.id)
	}

	const updateNodeLabel = (newLabel, nodeId) => {
		setLabel(newLabel)
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${nodeId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				label: newLabel,
			}),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.log('Error updating node label:', error)
			})
	}

	return (
		<DraggableCore nodeRef={divRef} bounds="body" handle=".handle" key={node.id} onStop={(newPosition) => handleMove(newPosition)}>
			<div ref={divRef} className="node background gradient-border" style={{ position: 'absolute', left: node.x - 30, top: node.y - 30 }}>
				<div className="gradient">
					<DragIndicatorIcon className="handle icon-drag" />
					<input value={label} className="input gradient" onChange={(e) => updateNodeLabel(e.target.value, node.id)} />
					<DeleteForeverIcon className="icon" onClick={() => handleDeleteNode(node.id)} />
					<AddCircleOutlineIcon className="add-top icon" onClick={() => handleAddNode(node.id, 'top', position.x, position.y)} />
					<AddCircleOutlineIcon className="add-right icon" onClick={() => handleAddNode(node.id, 'right', position.x, position.y)} />
					<AddCircleOutlineIcon className="add-bottom icon" onClick={() => handleAddNode(node.id, 'bottom', position.x, position.y)} />
					<AddCircleOutlineIcon className="add-left icon" onClick={() => handleAddNode(node.id, 'left', position.x, position.y)} />
				</div>
			</div>
		</DraggableCore>
	)
}

export default Node
