import { useEffect, useState } from 'react'

function Edge({ mapId, edge, nodes }) {
	const [sourceX, setSourceX] = useState(null)
    const [sourceY, setSourceY] = useState(null)
	const [targetX, setTargetX] = useState(null)
    const [targetY, setTargetY] = useState(null)

	useEffect(() => {
        if (edge.source_id) {
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${edge.source_id}`)
			.then((resp) => resp.json())
			.then((source) => {
				setSourceX(source.x)
                setSourceY(source.y)
                console.log("edge", edge.id, "source x:", source.x)
                console.log("edge", edge.id, "source y:", source.y)
			})
			.catch((error) => console.log('Error:', error))
        }
	}, [])

    useEffect(() => {
        if (edge.source_id) {
		fetch(`http://localhost:3000/maps/${mapId}/nodes/${edge.target_id}`)
			.then((resp) => resp.json())
			.then((target) => {
				setTargetX(target.x)
                setTargetY(target.y)
                console.log("edge", edge.id, "target x:", target.x)
                console.log("edge", edge.id, "target y:", target.y)
			})
			.catch((error) => console.log('Error:', error))
        }
	}, [])

	return (
		<div className="edge">
			<svg style={{ position: 'absolute', zIndex: 100 }}>
				<line x1={sourceX} y1={sourceY} x2={targetX} y2={targetY} stroke="black" strokeWidth="3" />
			</svg>
		</div>
	)
}

export default Edge
