import React, { Component } from 'react';
import API from '../../utils/API';
import Input from '../Input'; 
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
	state = {
        email: '',
        password: '',
		message: false,
		messageContent: '',
		redirectTo: null,
    };

	handleEmailInput = e => {
		this.setState({email: e.target.value});
	}

	handlePasswordInput = e => {
		this.setState({password: e.target.value});
	}

	handleSubmit = event => {
		event.preventDefault();
		this.setState({
			message: false,
			messageContent: ''
		});
		if (!this.state.email) {
			this.setState({
				message: true,
				messageContent: 'Please enter your email address.'
			});
		} else if (!this.state.password) {
			this.setState({
				message: true,
				messageContent: 'Please enter your password.'
			});
		} else {
			const signInInfo = {
				email: this.state.email,
				password: this.state.password
			};
        	API.login(signInInfo).then(response => {
				if (response.status === 200) {
					if (response.data.message) {
						this.setState({
							message: true,
							messageContent: response.data.message
						});
					} else {
                		this.props.updateUser({
							loggedIn: true,
							userId: response.data.id,
							email: response.data.email,
							name: response.data.name,
                            description: response.data.description,
                            image: response.data.image
						});
						// this.setState({
                    	// 	redirectTo: '/dashboard'
						// });
					}
            	}
        	}).catch(err => {
				this.setState({
					message: true,
					messageContent: 'Login error.'
				});
            	console.log('Login error:');
            	console.log(err);    
			});
		}
    }

	render() {
		if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else if (this.props.userInfo.loggedIn) {
			return <Redirect to={{ pathname: '/dashboard' }} />
		} else {
			return (
				<div className="card">
					<div className="card-body">
						<h3 className="card-title">Login</h3>
						<form>
							<div className="form-group">
								<label htmlFor="emailLoginInput">Email</label>
								<Input id="emailLoginInput" title="Email" name="Email" type="text" value={this.state.email} handleInput={this.handleEmailInput}/>
							</div>
							<div className="form-group">
								<label htmlFor="passwordLoginInput">Password</label>
								<Input id="passwordLoginInput" title="Password" name="Password" type="password" value={this.state.password} handleInput={this.handlePasswordInput}/>
							</div>
							<button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Submit</button>
						</form>
						{this.state.message ? (
							<p className="mt-2" style={{color:"red"}}>{this.state.messageContent}</p>
						) : (
							<div></div>
						)}
					</div>
				</div>
			)
		}
	}
};

export default LoginForm;