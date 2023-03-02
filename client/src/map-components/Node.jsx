import { useState, useRef } from 'react'
import DraggableCore from 'react-draggable'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Node({ node, handleAddNode, handleDeleteNode, updateNodePosition, updateLinePosition, updateNodeLabel }) {
	const [label, setLabel] = useState(node.label)
	const divRef = useRef(null)

	const handleMove = (data) => {
		updateNodePosition(data, node.id)
		updateLinePosition(data, node.id)
	}

	const handleLabelChange = (e) => {
		setLabel(e.target.value)
		updateNodeLabel(label, node.id)
	}

	return (
		<DraggableCore nodeRef={divRef} bounds="body" handle=".handle" key={node.id} defaultPosition={{ x: node.x, y: node.y }} onStop={(e, data) => handleMove(data)}>
			<div ref={divRef} className="node background gradient-border">
				<div className="gradient">
					<DragIndicatorIcon className="handle icon-drag" />
					<input value={label} className="input gradient" onChange={handleLabelChange} />
					<DeleteForeverIcon className="icon" onClick={() => handleDeleteNode(node.id)} />
					<AddCircleOutlineIcon className="add-top icon" onClick={() => handleAddNode(node.id, 'top', node.x, node.y)} />
					<AddCircleOutlineIcon className="add-right icon" onClick={() => handleAddNode(node.id, 'right', node.x, node.y)} />
					<AddCircleOutlineIcon className="add-bottom icon" onClick={() => handleAddNode(node.id, 'bottom', node.x, node.y)} />
					<AddCircleOutlineIcon className="add-left icon" onClick={() => handleAddNode(node.id, 'left', node.x, node.y)} />
				</div>
			</div>
		</DraggableCore>
	)
}

export default Node
