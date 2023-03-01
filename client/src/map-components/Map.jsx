import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Node from './Node'
import Line from './Line'

function Map() {
	const { id } = useParams()
	const mapId = parseInt(id)
	const [edges, setEdges] = useState([])
	const [nodes, setNodes] = useState([])
	const [title, setTitle] = useState([])

	useEffect(() => {
		if (mapId) {
			fetch(`http://localhost:3000/maps/${mapId}`)
				.then((resp) => resp.json())
				.then((data) => {
					setNodes(data.nodes)
					setEdges(data.edges)
					setTitle(data.title)
				})
				.catch((error) => console.log('Error:', error))
		}
	}, [])

	const handleAddNode = (parentNodeId, placement) => {
		fetch(`http://localhost:3000/maps/${mapId}/nodes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				label: 'New Node',
				x: 500,
				y: 500,
				color: '#000000',
				parent_id: parentNodeId,
			}),
		})
			.then((response) => response.json())
			.then((node) => {
				setNodes([...nodes, node])
                handleAddEdge(node)
			})
			.catch((error) => console.log('Error:', error))
	}

    const handleAddEdge = (node) => {
        // edge has source
        // edge has new target
        console.log(node)
    }

	const handleDeleteNode = (nodeId) => {
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${nodeId}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					const updatedNodes = nodes.filter((node) => node.id !== nodeId)
					setNodes(updatedNodes)
                    handleEdgeDelete(nodeId)
				} else {
					throw new Error('Network response was not ok.')
				}
			})
			.catch((error) => console.log('Error:', error))
	}

    const handleEdgeDelete = (nodeId) => {
        // find correct edge to delete
        console.log(nodeId)
    }

    const updateNodePosition = (newPosition, nodeId) => {
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
            .then((data) => {
                updateEdgePosition(data)
            })
			.catch((error) => {
				console.log('Error updating node position:', error)
			})
	}

    const updateEdgePosition = (target) => {
        // source position is the same
        // target position is updated
        console.log(target)
    }

	return (
		<div style={{ position: 'relative', width: '100%', height: '100%' }}>
			{edges.map((edge) => {
				const sourceNode = nodes.find((node) => node.id === edge.source_node_id)
				const targetNode = nodes.find((node) => node.id === edge.target_node_id)
				if (sourceNode && targetNode) {
					return <Line key={edge.id} x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y} />
				}
				return null
			})}
			{nodes.map((node) => (
				<Node key={node.id} mapId={mapId} node={node} nodes={nodes} handleAddNode={handleAddNode} handleDeleteNode={handleDeleteNode} updateNodePosition={updateNodePosition}/>
			))}
		</div>
	)
}

export default Map
