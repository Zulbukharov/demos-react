import React from 'react';
import './header.css';

const Header = ({ logout }) => {
	return (
		<nav className="navbar navbar-light bg-light header">
			<a className="box" href="#">
				<img src="https://picsum.photos/50/50" width="50" height="50" alt="" />
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