import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReplayIcon from '@mui/icons-material/Replay';

function Signup({ handleLogin }) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [avatarSeed, setAvatarSeed] = useState(Math.random().toString(36).substring(2))

	const handleSubmit = (event) => {
		event.preventDefault()
		fetch('/api/users', {
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
                    avatar_seed: avatarSeed,
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
			.then((data) => handleLogin(data.user))
			.catch((error) => console.log('Error:', error))
	}

	const handleReroll = () => {
		setAvatarSeed(Math.random().toString(36).substring(2))
	}

	return (
		<div className="login-form">
			<form onSubmit={handleSubmit}>
				<div className="form-input">
					<input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
					<label>Name</label>
				</div>
				<div className="form-input">
					<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
					<label>Email</label>
				</div>
				<div className="form-input">
					<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
					<label>Password</label>
				</div>
				<div className="form-input">
					<input type="password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} required />
					<label>Confirm Password</label>
				</div>
				<div className="avatar-select">
                    <label>Choose Avatar</label>
					<img className="avatar" src={`https://api.multiavatar.com/${avatarSeed}.png`} alt="Avatar" />
					<ReplayIcon className="icon" type="button" onClick={handleReroll}/>
				</div>
				<div className="form-buttons">
					<Link to="/login">
						<button>GO TO LOGIN</button>
					</Link>
					<button type="submit">SIGN UP</button>
				</div>
			</form>
		</div>
	)
}

export default Signup
