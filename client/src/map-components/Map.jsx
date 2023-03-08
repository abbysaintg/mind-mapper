import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import { MapContext } from '../App'
import Node from './Node'
import Line from './Line'

function Map() {
	const { user } = useContext(UserContext)
	const { mapId } = useContext(MapContext)
	const [title, setTitle] = useState([])
	const [nodes, setNodes] = useState([])
	const [lines, setLines] = useState([])

	useEffect(() => {
		if (!user || !mapId) return
		fetch(`/users/${user.id}/maps/${mapId}`)
			.then((resp) => resp.json())
			.then((data) => {
				setTitle(data.title)
				setNodes(data.nodes)
				setLines(data.lines)
			})
			.catch((error) => console.log('Error:', error))
	}, [user, mapId])

	const handleAddNode = (node_1, placement, positionX, positionY) => {
		let node_2_x
		let node_2_y
		const padding = 100 // Set padding from edges of the viewport
		if (placement === 'top') {
			node_2_x = Math.max(0, Math.min(positionX, window.innerWidth - padding))
			node_2_y = Math.max(0, Math.min(positionY - 100, window.innerHeight - padding))
		} else if (placement === 'right') {
			node_2_x = Math.max(0, Math.min(positionX + 250, window.innerWidth - padding))
			node_2_y = Math.max(0, Math.min(positionY, window.innerHeight - padding))
		} else if (placement === 'bottom') {
			node_2_x = Math.max(0, Math.min(positionX, window.innerWidth - padding))
			node_2_y = Math.max(0, Math.min(positionY + 100, window.innerHeight - padding))
		} else if (placement === 'left') {
			node_2_x = Math.max(0, Math.min(positionX - 250, window.innerWidth - padding))
			node_2_y = Math.max(0, Math.min(positionY, window.innerHeight - padding))
		} else {
			node_2_x = Math.max(0, Math.min(window.innerWidth / 2, window.innerWidth - padding))
			node_2_y = Math.max(0, Math.min(window.innerHeight / 2, window.innerHeight - padding))
		}

		fetch(`/users/${user.id}/maps/${mapId}/nodes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				node: {
					label: 'New Node',
                    color: 'green',
					x: node_2_x,
					y: node_2_y,
				},
			}),
		})
			.then((response) => response.json())
			.then((node_2) => {
				setNodes([...nodes, node_2])
				handleAddLine(node_1, node_2)
                console.log(node_2.color)
			})
			.catch((error) => console.log('Error:', error))
	}

	const handleAddLine = (node_1, node_2) => {
		fetch(`/users/${user.id}/maps/${mapId}/lines`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				line: {
					parent_id: node_1.id,
					child_id: node_2.id,
				},
			}),
		})
			.then((response) => response.json())
			.then((line) => {
				setLines([...lines, line])
			})
			.catch((error) => console.log('Error:', error))
	}

	const handleDeleteNode = (nodeId) => {
		fetch(`/users/${user.id}/maps/${mapId}/nodes/${nodeId}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					// delete all lines connected to the deleted node
					const linesToDelete = lines.filter((line) => line.parent_id === nodeId || line.child_id === nodeId)
					linesToDelete.forEach((line) => handleLineDelete(line.id))

					// Delete the node itself and update the state
					const updatedNodes = nodes.filter((node) => node.id !== nodeId)
					setNodes(updatedNodes)
				} else {
					throw new Error('Network response was not ok.')
				}
			})
			.catch((error) => console.log('Error:', error))
	}

	const handleLineDelete = (lineId) => {
		fetch(`/users/${user.id}/maps/${mapId}/lines/${lineId}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					const updatedLines = lines.filter((line) => line.id !== lineId)
					setLines(updatedLines)
				} else {
					throw new Error('Network response was not ok.')
				}
			})
			.catch((error) => console.log('Error:', error))
	}

	const updateNodePosition = (data, nodeId) => {
		// Find the index of the node to be updated in the nodes array
		const nodeIndex = nodes.findIndex((node) => node.id === nodeId)

		// Update the position of the node in the nodes array
		const updatedNodes = [...nodes.slice(0, nodeIndex), { ...nodes[nodeIndex], x: data.x, y: data.y }, ...nodes.slice(nodeIndex + 1)]
		setNodes(updatedNodes)

		// Update the position of the lines that are connected to the node
		const updatedLines = lines.map((line) => {
			if (line.parent_id === nodeId || line.child_id === nodeId) {
				const sourceNode = updatedNodes.find((node) => node.id === line.parent_id)
				const targetNode = updatedNodes.find((node) => node.id === line.child_id)
				if (sourceNode && targetNode) {
					return {
						...line,
						x1: sourceNode.x,
						y1: sourceNode.y,
						x2: targetNode.x,
						y2: targetNode.y,
					}
				}
			}
			return line
		})

		setLines(updatedLines)

		fetch(`/users/${user.id}/maps/${mapId}/nodes/${nodeId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				node: {
					x: data.x,
					y: data.y,
				},
			}),
		})
			.then((response) => response.json())
			.catch((error) => console.log('Error:', error))
	}

	const updateNodeLabel = (newLabel, nodeId) => {
		fetch(`/users/${user.id}/maps/${mapId}/nodes/${nodeId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				node: {
					label: newLabel,
				},
			}),
		})
			.then((response) => response.json())
			.catch((error) => console.log('Error:', error))
	}

    const updateNodeColor = (newColor, nodeId) => {
		fetch(`/users/${user.id}/maps/${mapId}/nodes/${nodeId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				node: {
					color: newColor,
				},
			}),
		})
			.then((response) => response.json())
			.catch((error) => console.log('Error:', error))
	}

    const handleMapNameChange = (newName) => {
        setTitle(newName)
		fetch(`/users/${user.id}/maps/${mapId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				map: {
					title: newName,
				},
			}),
		})
			.then((response) => response.json())
			.catch((error) => console.log('Error:', error))
	}

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault()
			e.target.blur()
		}
	}

	return (
		<>
			<input className="map-title" value={title} onChange={(e) => handleMapNameChange(e.target.value)} onKeyDown={handleKeyDown} />
			<div className="map-container">
				{nodes.map((node) => (
					<Node
						key={node.id}
						node={node}
						nodes={nodes}
						handleAddNode={handleAddNode}
						handleDeleteNode={handleDeleteNode}
						updateNodePosition={updateNodePosition}
						updateNodeLabel={updateNodeLabel}
                        updateNodeColor={updateNodeColor}
					/>
				))}
				{lines.map((line) => {
					const sourceNode = nodes.find((node) => node.id === line.parent_id)
					const targetNode = nodes.find((node) => node.id === line.child_id)
					if (sourceNode && targetNode) {
						return <Line key={line.id} x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y}/>
					}
					return null
				})}
			</div>
		</>
	)
}

export default Map
