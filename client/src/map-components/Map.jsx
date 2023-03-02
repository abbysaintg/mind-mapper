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
		if (user && mapId) {
			fetch(`http://localhost:3000/users/${user.id}/maps/${mapId}`, {
				credentials: 'include',
			})
				.then((resp) => resp.json())
				.then((data) => {
					setTitle(data.title)
					setNodes(data.nodes)
					setLines(data.lines)
				})
				.catch((error) => console.log('Error:', error))
		}
	}, [user, mapId])

	const handleAddNode = (node_1, placement, positionX, positionY) => {
		let node_2_x
		let node_2_y
		if (placement == 'top') {
			node_2_x = positionX
			node_2_y = positionY - 400
		} else if (placement == 'right') {
			node_2_x = positionX + 400
			node_2_y = positionY
		} else if (placement == 'bottom') {
			node_2_x = positionX
			node_2_y = positionY + 100
		} else if (placement == 'left') {
			node_2_x = positionX - 400
			node_2_y = positionY
		} else {
			node_2_x = window.innerWidth / 2
			node_2_y = window.innerHeight / 2
		}
		fetch(`http://localhost:3000/users/${user.id}/maps/${mapId}/nodes`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				node: {
					label: 'New Node',
					x: node_2_x,
					y: node_2_y,
				},
			}),
		})
			.then((response) => response.json())
			.then((node_2) => {
				setNodes([...nodes, node_2])
				handleAddLine(node_1, node_2)
			})
			.catch((error) => console.log('Error:', error))
	}

	const handleAddLine = (node_1, node_2) => {
		fetch(`http://localhost:3000/users/${user.id}/maps/${mapId}/lines`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				line: {
					parent_id: node_1.id,
					child_id: node_2.id,
					mapId: mapId,
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
		fetch(`http://localhost:3000/users/${user.id}/maps/${mapId}/nodes/${nodeId}`, {
			method: 'DELETE',
			credentials: 'include',
		})
			.then((response) => {
				if (response.ok) {
					const updatedNodes = nodes.filter((node) => node.id !== nodeId)
					setNodes(updatedNodes)
					handLineDelete(nodeId)
				} else {
					throw new Error('Network response was not ok.')
				}
			})
			.catch((error) => console.log('Error:', error))
	}

	const handLineDelete = (nodeId) => {
		// find correct line to delete
		console.log(nodeId)
	}

	const updateNodePosition = (data, nodeId) => {
		console.log(`New node position: x: ${data.x}, y: ${data.y}`)
		fetch(`http://localhost:3000/users/${user.id}/maps/${mapId}/nodes/${nodeId}`, {
			method: 'PATCH',
			credentials: 'include',
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
			.catch((error) => {
				console.log('Error updating node position:', error)
			})
	}

	const updateLinePosition = (data, nodeId) => {
		console.log('updating line position')
	}

	const updateNodeLabel = (newLabel, nodeId) => {
		setLabel(newLabel)
		fetch(`http://localhost:3000/users/${user.id}/maps/${mapId}/nodes/${nodeId}`, {
			method: 'PATCH',
			credentials: 'include',
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
			.catch((error) => {
				console.log('Error updating node label:', error)
			})
	}

	return (
		<>
			<h1 className="gradient">{title}</h1>
			<div>
				{nodes.map((node) => (
					<Node
						key={node.id}
						node={node}
						nodes={nodes}
						handleAddNode={handleAddNode}
						handleDeleteNode={handleDeleteNode}
						updateNodePosition={updateNodePosition}
						updateLinePosition={updateLinePosition}
                        updateNodeLabel={updateNodeLabel}
					/>
				))}
				{lines.map((line) => {
					const sourceNode = nodes.find((node) => node.id === line.parent_id)
					const targetNode = nodes.find((node) => node.id === line.child_id)
					if (sourceNode && targetNode) {
						return <Line key={line.id} x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y} />
					}
					return null
				})}
			</div>
		</>
	)
}

export default Map
