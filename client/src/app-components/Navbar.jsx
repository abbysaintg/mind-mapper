import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'

function Navbar({ loggedIn, handleLogout }) {
	return (
		<nav className="nav">
			<ul className="gradient">
				{loggedIn ? (
					<>
						<Link to="/"><HomeIcon /></Link>
						<Link to="/">HOME</Link>
						<Link to="/maps">MAPS</Link>
						<Link to="/login" onClick={handleLogout}>
							LOGOUT
						</Link>
					</>
				) : (
					<>
						<Link to="/"><HomeIcon /></Link>
						<Link to="/">HOME</Link>
						<Link to="/login">LOGIN</Link>
						<Link to="/signup">SIGN UP</Link>
					</>
				)}
			</ul>
		</nav>
	)
}
export default Navbar
