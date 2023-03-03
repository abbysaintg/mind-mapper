import { useState, useEffect, useRef } from 'react'
import DraggableCore from 'react-draggable'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Node({ node, handleAddNode, handleDeleteNode, updateNodePosition, updateNodeLabel }) {
	const [label, setLabel] = useState(node.label)
	const divRef = useRef(null)

	const handleLabelChange = (e) => {
		setLabel(e.target.value)
		updateNodeLabel(e.target.value, node.id)
	}

	return (
		<DraggableCore nodeRef={divRef} bounds="body" handle=".handle" key={node.id} defaultPosition={{ x: node.x, y: node.y }} onStop={(e, data) => updateNodePosition(data, node.id)}>
			<div ref={divRef} className="node gradient gradient-border">
				<DragIndicatorIcon className="handle icon-drag" />
				<input value={label} className="input gradient" onChange={handleLabelChange} />
				<DeleteForeverIcon className="icon" onClick={() => handleDeleteNode(node.id)} />
				<AddCircleOutlineIcon className="add-top icon" onClick={() => handleAddNode(node, 'top', node.x, node.y)} />
				<AddCircleOutlineIcon className="add-right icon" onClick={() => handleAddNode(node, 'right', node.x, node.y)} />
				<AddCircleOutlineIcon className="add-bottom icon" onClick={() => handleAddNode(node, 'bottom', node.x, node.y)} />
				<AddCircleOutlineIcon className="add-left icon" onClick={() => handleAddNode(node, 'left', node.x, node.y)} />
			</div>
		</DraggableCore>
	)
}

export default Node
