import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Login({ handleLogin }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		fetch('/api/login', {
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
			.then((data) => handleLogin(data.user))
			.catch((error) => console.log('Error:', error))
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
				<div className="form-buttons">
					<button type="submit">LOGIN</button>
					<Link to="/signup"><button>GO TO SIGN UP</button></Link>
				</div>
            </form>
        </div>
	)
}

export default Login
