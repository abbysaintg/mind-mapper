import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import DraggableCore from 'react-draggable'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Map() {
	const { id } = useParams()
	const mapId = parseInt(id)
	const [nodes, setNodes] = useState([])
	const [edges, setEdges] = useState([])
	const [title, setTitle] = useState([])
	const divRef = useRef(null)
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

	useEffect(() => {
		if (mapId) {
			fetch(`http://localhost:3000/maps/${mapId}`)
				.then((resp) => resp.json())
				.then((data) => {
					console.log('Map Data:', data)
					setTitle(data.title)
					setNodes(data.nodes)
					setEdges(data.edges)
				})
				.catch((error) => console.log('Error:', error))
		}
	}, [mapId])

	function handleMouseMove(event) {
		const { clientX, clientY } = event
		setCoordinates({ x: clientX, y: clientY })
	}

	// useLayoutEffect(() => {
	// 	// This function will be called after the Draggle components have mounted
	// 	// and their default positions have been set.
	// 	// If you need to perform any operations on the nodes or their positions,
	// 	// this is a good place to do it.
	// 	// console.log('Nodes:', nodes)
	// }, [nodes])

	const handleAddNode = (nodeId, placement) => {
		fetch(`http://localhost:3000/maps/${mapId}/nodes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				label: 'New Node',
				x: 0,
				y: 0,
				color: '#000000',
				parent_id: nodeId,
			}),
		})
			.then((response) => response.json())
			.then((node) => {
				setNodes([...nodes, node])
			})
			.catch((error) => console.log('Error:', error))
	}

	const updateNodePosition = (data, nodeId) => {
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${nodeId}`, {
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
				console.log('Node position updated:', data)
			})
			.catch((error) => {
				console.log('Error updating node position:', error)
			})
	}

	const updateNodeLabel = (newLabel, nodeId) => {
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
			.then((data) => {
				console.log('Node updated:', data)
			})
			.catch((error) => {
				console.log('Error updating node:', error)
			})
	}

	const handleDeleteNode = (nodeId) => {
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${nodeId}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					const updatedNodes = nodes.filter((node) => node.id !== nodeId)
					setNodes(updatedNodes)
				} else {
					throw new Error('Network response was not ok.')
				}
			})
			.catch((error) => console.log('Error:', error))
	}

	return (
		<div className="map-container" onMouseMove={handleMouseMove}>
			<p>
				Mouse coordinates: X {coordinates.x}, Y {coordinates.y}
			</p>
			{nodes.map((node) => {
				return (
					<DraggableCore nodeRef={divRef} bounds="body" handle=".handle" key={node.id} defaultPosition={{ x: node.x, y: node.y }} onStop={(data) => updateNodePosition(data, node.id)}>
						<div ref={divRef} className="node" >
                            <DragIndicatorIcon className="handle"/>
							<input value={node.label} onChange={(e) => updateNodeLabel(e.target.value, node.id)} className="input" onDoubleClick={() => inputRef.current.select()} />
							<DeleteForeverIcon onClick={() => handleDeleteNode(node.id)} className="icon" />
							<AddCircleOutlineIcon className="add-top" onClick={() => handleAddNode(node.id, 'top')} />
							<AddCircleOutlineIcon className="add-right" onClick={() => handleAddNode(node.id, 'right')} />
							<AddCircleOutlineIcon className="add-bottom" onClick={() => handleAddNode(node.id, 'bottom')} />
							<AddCircleOutlineIcon className="add-left" onClick={() => handleAddNode(node.id, 'left')} />
						</div>
					</DraggableCore>
				)
			})}
		</div>
	)
}

export default Map

// positionOffset={{ x: -200, y: -200 }}
// defaultPosition={{ x: node.x, y: node.y }}
// style={{ position: 'absolute', left: node.x, top: node.y }}
