import React, { useContext } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const logoutHandler = (e) => {
		e.preventDefault()
		auth.logout()
		navigate('/')
	}

	return(
		<nav>
		<div className="nav-wrapper  #4a148c purple darken-4" style={{padding: '0 2rem'}}>
		  <span className="brand-logo right">Shorten the link</span>
		  <ul id="nav-mobile" className="left hide-on-med-and-down">
			<li><NavLink to="/create">Create</NavLink></li>
			<li><NavLink to="/links">Links</NavLink></li>
			<li><a href='/' onClick={logoutHandler}>Log out</a></li>
		  </ul>
		</div>
	  </nav>
	)
}