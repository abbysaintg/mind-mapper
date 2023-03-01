import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Node from './Node'
import Line from './Line'

function Map() {
	const [title, setTitle] = useState([])
	const [nodes, setNodes] = useState([])
	const [lines, setLines] = useState([])
    const { user_id, map_id } = useParams()

    console.log('Map component rendered')
    console.log(user_id)
    console.log(map_id)

	useEffect(() => {
		if (map_id) {
            console.log(`Fetching data for map ${map_id}`)
			fetch(`http://localhost:3000/users/${user_id}/maps/${map_id}`, {
                credentials: 'include',
            })
				.then((resp) => resp.json())
				.then((data) => {
					setTitle(data.title)
					setNodes(data.nodes)
					setLines(data.lines)
                    console.log("data fetched")
				})
				.catch((error) => console.log('Error:', error))
		}
	}, [user_id, map_id])

	const handleAddNode = (node_1, placement, positionX, positionY) => {
		let node_2_x
		let node_2_y
		if (placement == 'top') {
			node_2_x = positionX
			node_2_y = positionY - 100
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
			return
		}
		fetch(`http://localhost:3000/users/${user_id}/maps/${map_id}/nodes`, {
			method: 'POST',
            credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				label: 'New Node',
				x: node_2_x,
				y: node_2_y,
			}),
		})
			.then((response) => response.json())
			.then((node_2) => {
				setNodes([...nodes, node_2])
				handleAddLine(node_1, placement, node_2, node_2_x, node_2_y)
			})
			.catch((error) => console.log('Error:', error))
	}

	const handleAddLine = (node_1, placement, node_2, node_2_x, node_2_y) => {
        fetch(`http://localhost:3000/users/${user_id}/maps/${map_id}/lines`, {
			method: 'POST',
            credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({

              })
		})
			.then((response) => response.json())
			.then((line) => {
				setLines([...lines, line])
			})
			.catch((error) => console.log('Error:', error))
	}

	const handleDeleteNode = (nodeId) => {
		fetch(`http://localhost:3000/users/${user_id}/maps/${map_id}/nodes/${nodeId}`, {
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

	const updateNodePosition = (newPosition, nodeId) => {
		fetch(`http://localhost:3000/users/${user_id}/maps/${map_id}/nodes/${nodeId}`, {
			method: 'PATCH',
            credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				x: newPosition.x,
				y: newPosition.y,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				updateLinePosition(data)
			})
			.catch((error) => {
				console.log('Error updating node position:', error)
			})
	}

	const updateLinePosition = (target) => {
		// source position is the same
		// target position is updated
		console.log(target)
	}

	return (
        <>
            <h1 className='gradient'>{title}</h1>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {lines.map((line) => {
                    const sourceNode = nodes.find((node) => node.id === line.source_node_id)
                    const targetNode = nodes.find((node) => node.id === line.target_node_id)
                    if (sourceNode && targetNode) {
                        return <Line key={line.id} x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y} />
                    }
                    return null
                })}
                {nodes.map((node) => (
                    <Node key={node.id} user_id={user_id} map_id={map_id} node={node} nodes={nodes} handleAddNode={handleAddNode} handleDeleteNode={handleDeleteNode} updateNodePosition={updateNodePosition} />
                ))}
            </div>
        </>
	)
}

export default Map
