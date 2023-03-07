import { useContext } from 'react'
import { UserContext } from '../App'

function Welcome() {
	const { user } = useContext(UserContext)

	return (
		<div className="welcome-container">
			<h1 className="welcome-title">Welcome, {user ? user.name : 'please sign in to continue'}.</h1>
		</div>
	)
}

export default Welcome
