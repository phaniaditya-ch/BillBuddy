import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
	return (
		<div>
			<nav>
				<Link to="/" className="logo">BillBuddy</Link>
				<div className="bx bx-menu" id="menu-icon"></div>

				<ul className="nav-list">
					<li><Link to="">Home</Link></li>
					<li><Link to="">About</Link></li>
					<li><Link to="">Services</Link></li>
					<li><Link to="">Blog</Link></li>
					<li><Link to="">Contact</Link></li>
				</ul>

				<Link to="/" className="btn">Book Now</Link>
			</nav>
		</div>
	)
}

export default Navbar