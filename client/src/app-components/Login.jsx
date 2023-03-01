import React, { useState } from 'react'

function Login({ handleLogin }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		fetch('http://localhost:3000/login', {
			method: 'POST',
            credentials: 'include', // Send cookies with the request
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				session: {
					email: email,
					password: password,
				},
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error('Login failed')
				}
			})
			.then((data) => {
				handleLogin(data.user)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<form onSubmit={handleSubmit} >
			<h2 className="gradient">Login</h2>
			<label className="gradient">
				Email:
				<input className="form-input gradient-border" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
			</label>
			<label className="gradient">
				Password:
				<input className="form-input gradient-border" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
			</label>
			<button type="submit">Submit</button>
		</form>
	)
}

export default Login
