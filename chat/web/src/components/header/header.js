import React from 'react';
import './header.css';

const Header = ({ logout, avatar_url }) => {
	return (
		<nav className="navbar header">
			<a className="box" href="#">
				<img src={avatar_url} width="50" height="50" alt="" />
			</a>
			<button
				className="btn btn-outline-primary box"
				onClick={logout}>
				logout
		  </button>
		</nav>
	)
}

export default Header;