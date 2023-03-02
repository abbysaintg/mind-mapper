import { Link } from 'react-router-dom'

function Navbar({ loggedIn, handleLogout }) {
	return (
		<nav className="nav">
			<ul className='gradient'>
				{loggedIn ? (
					<>
						<Link to="/">Home</Link>
						<Link to="/maps">Maps</Link>
						<Link to="/login" onClick={handleLogout}>Logout</Link>
					</>
				) : (
					<>
						{' '}
						<Link to="/">Home</Link>
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign Up</Link>
					</>
				)}
			</ul>
		</nav>
	)
}
export default Navbar
