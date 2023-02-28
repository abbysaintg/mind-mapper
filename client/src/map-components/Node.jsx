import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import Draggable from 'react-draggable'
import NodeMenu from './NodeMenu'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function Node({ node, mapId, handleAddNode, handleDeleteNode }) {
	const [nodePosition, setNodePosition] = useState({ x: node.x, y: node.y }) // Node Position
	const [label, setLabel] = useState(node.label)
	const divRef = useRef(null)
	// const inputRef = useRef(null)

	// focus / activate a node right after it gets created
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		inputRef.current?.focus({ preventScroll: true })
	// 	}, 1)
	// }, [])

	// dynamic width for the nodes based on length of text
	// useLayoutEffect(() => {
	// 	if (inputRef.current) {
	// 		inputRef.current.style.width = `${node.label.length * 10}px`
	// 	}
	// }, [node.label.length])

	const updateNodePosition = (data) => {
		setNodePosition({ x: data.x, y: data.y })
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${node.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				x: data.x,
				y: data.y,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log('Node position updated:', data)
			})
			.catch((error) => {
				console.log('Error updating node position:', error)
			})
	}

	const updateNodeLabel = (newLabel) => {
		setLabel(newLabel)
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${node.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				label: newLabel,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Node updated:', data)
			})
			.catch((error) => {
				console.log('Error updating node:', error)
			})
	}

	const handleDelete = () => {
		handleDeleteNode(node.id)
	}

	return (
        <Draggable nodeRef={divRef} defaultPosition={nodePosition} onDrag={(data) => updateNodePosition(data)} bounds="parent" >
            <div ref={divRef} className="node">
                <input value={label} onChange={(e) => updateNodeLabel(e.target.value)} className="input" onDoubleClick={() => inputRef.current.select()} />
                <NodeMenu handleDelete={handleDelete} />
                <AddCircleOutlineIcon className="add-top" onClick={() => handleAddNode(node.id, 'top')} />
                <AddCircleOutlineIcon className="add-right" onClick={() => handleAddNode(node.id, 'right')} />
                <AddCircleOutlineIcon className="add-bottom" onClick={() => handleAddNode(node.id, 'bottom')} />
                <AddCircleOutlineIcon className="add-left" onClick={() => handleAddNode(node.id, 'left')} />
            </div>
        </Draggable>
	)
}

export default Node


