import { useEffect, useState, useRef } from 'react'
import DraggableCore from 'react-draggable'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Node({ mapId, node, handleAddNode, handleDeleteNode }) {
    const [label, setLabel] = useState(node.label)
    const [position, setPosition] = useState({ x: node.x, y: node.y })
    const divRef = useRef(null)

    const updateNodePosition = (newPosition, nodeId) => {
        setPosition({ x: newPosition.x, y: newPosition.y })
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${nodeId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				x: newPosition.x,
				y: newPosition.y,
			}),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.log('Error updating node position:', error)
			})
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
				console.log('Error updating node:', error)
			})
	}

	return (
		<DraggableCore nodeRef={divRef} bounds="body" handle=".handle" key={node.id} onStop={(newPosition) => updateNodePosition(newPosition, node.id)}>
			<div ref={divRef} className="node" style={{ position: 'absolute', left: node.x - 30, top: node.y - 30 }}>
				<DragIndicatorIcon className="handle" />
				<input value={label} className="input" onChange={(e) => updateNodeLabel(e.target.value, node.id)} />
				<DeleteForeverIcon onClick={() => handleDeleteNode(node.id)} className="icon" />
				<AddCircleOutlineIcon className="add-top" onClick={() => handleAddNode(node.id, 'top')} />
				<AddCircleOutlineIcon className="add-right" onClick={() => handleAddNode(node.id, 'right')} />
				<AddCircleOutlineIcon className="add-bottom" onClick={() => handleAddNode(node.id, 'bottom')} />
				<AddCircleOutlineIcon className="add-left" onClick={() => handleAddNode(node.id, 'left')} />
			</div>
		</DraggableCore>
	)
}

export default Node
