import { Link, useMatch, useResolvedPath } from 'react-router-dom'

function Navbar() {
	return (
		<nav className="nav">
			<Link to="/" className="site-title">
				Mind Mapper
			</Link>
			<ul>
				<CustomLink to="/maps">Maps</CustomLink>
				<CustomLink to="/profile">Profile</CustomLink>
				<CustomLink to="/login">Login</CustomLink>
			</ul>
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
