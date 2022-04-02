import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMassege } from '../hooks/messege.hook';


export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const massege = useMassege()
	const {loading, error, request, clearError} = useHttp()
	const [form, setForm] = useState({
		email: '', password: ''
	})

	useEffect(() => {
		massege(error)
		clearError()
	},[error, massege, clearError])

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = e =>{
		setForm({...form, [e.target.name]: e.target.value})
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/regitser', 'POST', {...form})
			massege(data.message)
		} catch (e) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form})
			auth.login(data.token, data.userId)
		} catch (e) {}
	}

	return(
		<div className='row'>
			<div className='col s9 offset-s3'>
				<h1>Shorten the link</h1>
					<div className="col s12 m6">
					<div className="card #4a148c purple darken-4">
						<div className="card-content white-text">
						<span className="card-title center-align">Auth</span>

						<div>
							<div className="input-field">
								<input 
								id="email" 
								type="text" 
								name='email' 
								className='white-input'
								value={form.email}
								onChange={changeHandler}
								/> 
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div>
							<div className="input-field">
								<input 
								id="password" 
								type="password" 
								name='password' 
								className='white-input'
								value={form.password}
								onChange={changeHandler}

								/> 
								<label htmlFor="password">Password</label>
							</div>
						</div>

						</div>
						<div className="card-action">
							<button 
							onClick={loginHandler}
							className='btn #f57f17 yellow darken-4 left'
							disabled={loading}
							>
								Log in
								</button>

							<button
							onClick={registerHandler}
							disabled={loading}
							className='btn #2e7d32 green darken-3 right'>
								Register
								</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}