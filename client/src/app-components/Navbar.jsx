import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import { UserContext } from '../App'

function Navbar({ loggedIn, handleLogout }) {
	const { user } = useContext(UserContext)

	return (
		<nav className="nav">
			<div className="left-side">
				<Link to="/">
					<HomeIcon style={{ fontSize: 40 }} />
				</Link>
				<Link className="home-link" to="/">HOME</Link>
			</div>
			<div className="right-side">
				{loggedIn ? (
					<div className="dropdown">
						<img className="avatar-thumb" src={`https://api.multiavatar.com/${user.avatar_seed}.png`} alt="Avatar" />
							<div className="dropdown-content">
								<Link to="/maps">MAPS</Link>
								<Link to="/login" onClick={handleLogout}>
									LOGOUT
								</Link>
							</div>
					</div>
				) : (
					<div className="links">
						<Link to="/login">LOG IN</Link>
						<Link to="/signup">SIGN UP</Link>
					</div>
				)}
			</div>
		</nav>
	)
}
export default Navbar
