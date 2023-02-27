import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import Draggable from 'react-draggable'

function Node({ node }) {
	const [position, setPosition] = useState({ x: 0, y: 0 })
    const divRef = useRef(null);
	// const inputRef = useRef<HTMLInputElement>(null)

	const trackPos = (data) => {
		setPosition({ x: data.x, y: data.y })
	}

	// focus / activate a node right after it gets created
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		inputRef.current?.focus({ preventScroll: true })
	// 	}, 1)
	// }, [])

	// dynamic width for the nodes based on length of text
	// useLayoutEffect(() => {
	// 	if (inputRef.current) {
	// 		inputRef.current.style.width = `${node.label.length * 8}px`
	// 	}
	// }, [node.label.length])

	return (
		<Draggable nodeRef={divRef} onDrag={(e, data) => trackPos(data)}>
			<div ref={divRef} className="box">
				<input value={node.label} onChange={(e) => updateNodeLabel(node, e.target.value)} className="input" />
				<button className="delete-button" onClick={() => deleteNode(node)}>
					x
				</button>
			</div>
		</Draggable>
	)
}

export default Node

{
	/* <div>
x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
</div> */
}
