import React from 'react';
import { NavLink } from 'react-router-dom';

import Auth from '../../utils/auth';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './Navigation.css';

const Navigation = () => {
	const activeStyle = {
		color : 'white'
	};

	const showNavigation = () => {
		if (Auth.loggedIn()) {
			const userId = Auth.getUserId();
			return (
				<>
					<NavLink to={`/user/${userId}`} className="mr-3">
						Dashboard
					</NavLink>
					<a href="/" className="mr-3" onClick={() => Auth.logout()}>
						Logout
					</a>
				</>
			);
		} else {
			return (
				<>
					<NavLink exact to="/about" activeStyle={activeStyle} className="mr-3">
						About Us
					</NavLink>
					<NavLink exact to="/login" activeStyle={activeStyle} className="mr-3">
						Login
					</NavLink>
				</>
			);
		}
	};

	return (
		<Navbar expand="lg" className="Navigation">
			<NavLink
				exact
				to="/"
				activeStyle={activeStyle}
				className="Navigation-brand-bskr"
			>
				Creator Site
			</NavLink>

			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			{/* BS id, don't think we need, but could be for collapsing functionality */}
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">{showNavigation()}</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Navigation;