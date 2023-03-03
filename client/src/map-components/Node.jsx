import { useState, useRef, useLayoutEffect } from 'react'
import DraggableCore from 'react-draggable'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Node({ node, handleAddNode, handleDeleteNode, updateNodePosition, updateNodeLabel }) {
	const [label, setLabel] = useState(node.label)
	const divRef = useRef(null)
	const inputRef = useRef(null)

	useLayoutEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.width = `${label.length * 8 + 20}px`
		}
	}, [label.length])

	const handleLabelChange = (e) => {
		setLabel(e.target.value)
		updateNodeLabel(e.target.value, node.id)
	}

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault()
			e.target.blur()
		}
	}

	return (
		<DraggableCore nodeRef={divRef} bounds="body" handle=".handle" key={node.id} defaultPosition={{ x: node.x, y: node.y }} onStop={(e, data) => updateNodePosition(data, node.id)}>
			<div ref={divRef} className="node gradient gradient-border">
				<DragIndicatorIcon className="handle" />
				<input
					value={label}
					ref={inputRef}
					className="input gradient"
					onChange={handleLabelChange}
					onKeyDown={handleKeyDown}
				/>
				<DeleteForeverIcon className="delete-icon" onClick={() => handleDeleteNode(node.id)} />
				<AddCircleOutlineIcon className="add-top icon" onClick={() => handleAddNode(node, 'top', node.x, node.y)} />
				<AddCircleOutlineIcon className="add-right icon" onClick={() => handleAddNode(node, 'right', node.x, node.y)} />
				<AddCircleOutlineIcon className="add-bottom icon" onClick={() => handleAddNode(node, 'bottom', node.x, node.y)} />
				<AddCircleOutlineIcon className="add-left icon" onClick={() => handleAddNode(node, 'left', node.x, node.y)} />
			</div>
		</DraggableCore>
	)
}

export default Node
