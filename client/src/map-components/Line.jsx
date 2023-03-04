import React from 'react'

const Line = ({ x1, y1, x2, y2 }) => {
	const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
	const angle = Math.atan2(y2 - y1, x2 - x1)
	const transform = `translate(${(x1 + 90)}px, ${(y1 + 25)}px) rotate(${angle}rad)`

	return (
		<div
			style={{
				position: 'absolute',
				width: distance,
				height: 3,
				backgroundColor: '#296e90',
				transformOrigin: 'top left',
				transform: transform,
			}}
            className="line"
		/>
	)
}

export default Line


