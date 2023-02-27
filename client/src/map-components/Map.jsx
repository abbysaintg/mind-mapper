import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Node from './Node'
import Edge from './Edge'

function Map() {
	const [nodes, setNodes] = useState([])
	const [edges, setEdges] = useState([])
	const [title, setTitle] = useState([])
    const { id } = useParams()
	const mapId = parseInt(id)

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

	return (
		<div>
			<div>Map: {mapId}</div>
			<div>Title: {title}</div>
			{nodes.map((node) => (
				<Node key={node.id} node={node} />
			))}
			{edges.map((edge) => (
				<Edge key={edge.id} node={edge} />
			))}
		</div>
	)
}

export default Map
