import { useState, useRef, useLayoutEffect } from 'react'
import DraggableCore from 'react-draggable'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CircleIcon from '@mui/icons-material/Circle';

function Node({ node, handleAddNode, handleDeleteNode, updateNodePosition, updateNodeLabel, updateNodeColor }) {
	const [label, setLabel] = useState(node.label)
    const [nodeColor, setNodeColor] = useState(node.color)
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

    const selectColor = (selection) => {
        if (selection === "pink") {
            setNodeColor("pink")
            updateNodeColor("pink", node.id)
        } else if (selection === "green") {
            setNodeColor("green")
            updateNodeColor("green", node.id)
        } else if (selection === "yellow") {
            setNodeColor("yellow")
            updateNodeColor("yellow", node.id)
        } else if (selection === "purple") {
            setNodeColor("purple")
            updateNodeColor("purple", node.id)
        }
    }

	return (
		<DraggableCore nodeRef={divRef} bounds="body" handle=".handle" key={node.id} defaultPosition={{ x: node.x, y: node.y }} onDrag={(e, data) => updateNodePosition(data, node.id)}>
			<div ref={divRef} className={`node ${nodeColor}`}>
				<div className='top-row'>
                    <DragIndicatorIcon className="handle icon" />
                    <input value={label} ref={inputRef} className="input" onChange={handleLabelChange} onKeyDown={handleKeyDown} />
                    <DeleteForeverIcon className="icon" onClick={() => handleDeleteNode(node.id)} />
                    <AddCircleOutlineIcon className="add-top add-icon" onClick={() => handleAddNode(node, 'top', node.x, node.y)} />
                    <AddCircleOutlineIcon className="add-right add-icon" onClick={() => handleAddNode(node, 'right', node.x, node.y)} />
                    <AddCircleOutlineIcon className="add-bottom add-icon" onClick={() => handleAddNode(node, 'bottom', node.x, node.y)} />
                    <AddCircleOutlineIcon className="add-left add-icon" onClick={() => handleAddNode(node, 'left', node.x, node.y)} />
                </div>
                <div className='bottom-row'>
                    <CircleIcon className='pink-icon icon' onClick={() => selectColor("pink")}/>
                    <CircleIcon className='green-icon icon' onClick={() => selectColor("green")}/>
                    <CircleIcon className='yellow-icon icon' onClick={() => selectColor("yellow")}/>
                    <CircleIcon className='purple-icon icon' onClick={() => selectColor("purple")}/>
                </div>
			</div>
		</DraggableCore>
	)
}

export default Node
