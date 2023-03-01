import { useState } from 'react'

function Signup({ handleLogin }) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		fetch('http://localhost:3000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: {
					name: name,
					email: email,
					password: password,
					password_confirmation: passwordConfirmation,
				},
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error('Create user failed')
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
		<form onSubmit={handleSubmit}>
			<h2 className="gradient">Create User</h2>
			<label className="gradient">
				Name:
				<input className="form-input gradient-border" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
			</label>
			<label className="gradient">
				Email:
				<input className="form-input gradient-border" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
			</label>
			<label className="gradient">
				Password:
				<input className="form-input gradient-border" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
			</label>
			<label className="gradient">
				Confirm Password:
				<input className="form-input gradient-border" type="password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} required />
			</label>
			<button type="submit">Submit</button>
		</form>
	)
}

export default Signup
