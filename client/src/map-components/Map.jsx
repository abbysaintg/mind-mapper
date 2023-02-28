import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Node from './Node'

function Map() {
	const { id } = useParams()
	const mapId = parseInt(id)
	const [nodes, setNodes] = useState([])
	const [edges, setEdges] = useState([])
	const [title, setTitle] = useState([])

	useEffect(() => {
		if (mapId) {
			fetch(`http://localhost:3000/maps/${mapId}`)
				.then((resp) => resp.json())
				.then((data) => {
					setTitle(data.title)
					setNodes(data.nodes)
					setEdges(data.edges)
				})
				.catch((error) => console.log('Error:', error))
		}
	}, [])

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
		<div className="map-container">
			{nodes.map((node) => (
				<Node key={node.id} mapId={mapId} node={node} handleAddNode={handleAddNode} handleDeleteNode={handleDeleteNode} />
			))}
		</div>
	)
}

export default Map
