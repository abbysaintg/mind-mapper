import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login({ handleLogin }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const handleSubmit = (event) => {
		event.preventDefault()

		fetch('/login', {
			method: 'POST',
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
			.then((resp) => {
				if (resp.ok) {
					return resp.json()
				} else {
					throw new Error('Unable to login at this time. Please try again later.')
				}
			})
			.then((data) => {
				if (data.user) {
					handleLogin(data.user)
				} else {
					throw new Error('Incorrect email or password.')
				}
			})
			.catch((error) => {
				setError(error.message)
			})
	}

	return (
		<div className="login-form">

			<form onSubmit={handleSubmit}>
				<div className="form-input">
					<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
					<label>Email</label>
				</div>
				<div className="form-input">
					<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
					<label>Password</label>
				</div>
                {error && <p className="error-message">{error}</p>}
				<div className="form-buttons">
					<button type="submit">LOGIN</button>
					<Link to="/signup">
						<button>GO TO SIGN UP</button>
					</Link>
				</div>
			</form>
		</div>
	)
}

export default Login
