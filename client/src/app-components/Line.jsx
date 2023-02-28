import { useRef, useEffect } from 'react'
function Line() {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')

		// Set line color and width
		context.strokeStyle = 'black'
		context.lineWidth = 2

		// Track mouse movements
		let isDrawing = false
		let startX = 0
		let startY = 0

		function handleMouseDown(event) {
			isDrawing = true
			startX = event.clientX - canvas.offsetLeft
			startY = event.clientY - canvas.offsetTop
		}

		function handleMouseMove(event) {
			if (!isDrawing) return

			const x = event.clientX - canvas.offsetLeft
			const y = event.clientY - canvas.offsetTop

			context.clearRect(0, 0, canvas.width, canvas.height)
			context.beginPath()
			context.moveTo(startX, startY)
			context.lineTo(x, y)
			context.stroke()
		}

		function handleMouseUp() {
			isDrawing = false
		}

		// Add event listeners
		canvas.addEventListener('mousedown', handleMouseDown)
		canvas.addEventListener('mousemove', handleMouseMove)
		canvas.addEventListener('mouseup', handleMouseUp)

		// Clean up event listeners
		return () => {
			canvas.removeEventListener('mousedown', handleMouseDown)
			canvas.removeEventListener('mousemove', handleMouseMove)
			canvas.removeEventListener('mouseup', handleMouseUp)
		}
	}, [])

	return <canvas ref={canvasRef} className="canvas" />
}

export default Line
