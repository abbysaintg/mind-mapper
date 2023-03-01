import { Link, useMatch, useResolvedPath } from 'react-router-dom'

function Navbar({ user, handleLogout }) {
	return (
		<nav className="nav">
			<Link to="/" className="site-title gradient">
				Mind Mapper
			</Link>
			{user ? (
				<ul className="gradient">
					<CustomLink to="/maps">Maps</CustomLink>
					<CustomLink to="/profile">Profile</CustomLink>
					<li>
						<button onClick={handleLogout}>Logout</button>
					</li>
				</ul>
			) : (
				<ul className="gradient">
					<CustomLink to="/">Home</CustomLink>
					<CustomLink to="/login">Login</CustomLink>
					<CustomLink to="/signup">Signup</CustomLink>
				</ul>
			)}
		</nav>
	)
}

function CustomLink({ to, children, ...props }) {
	const resolvedPath = useResolvedPath(to) // converts relative paths to absolute paths
	const isActive = useMatch({ path: resolvedPath.pathname, end: true })

	return (
		<li className={isActive ? 'active' : ''}>
			<Link to={to} {...props}>
				{children}
			</Link>
		</li>
	)
}

export default Navbar
