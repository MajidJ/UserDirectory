import React, { Component } from 'react';
import Input from '../Input'; 
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';



class SignUpForm extends Component {
	state = {
		name: '',
		description: '',
		selectedFile: null,
		email: '',
		password: '',
		confirmPassword: '',
		message: false,
		messageContent: '',
		redirectTo: null,
	};

	handleNameInput = e => {
		this.setState({name: e.target.value});
	}

	handleDescriptionInput = e => {
		this.setState({description: e.target.value});
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value});
	}

	handlePasswordInput = e => {
		this.setState({password: e.target.value});
	}

	handlePasswordConfirmInput = e => {
		this.setState({confirmPassword: e.target.value});
	}

	handleSelectedFileInput = e => {
		this.setState({selectedFile: e.target.files[0]});
	}

	handleSubmit = event => {
		event.preventDefault();
		console.log(this.state.selectedFile);
		this.setState({
			message: false,
			messageContent: ''
		});
		if (!this.state.name) {
			this.setState({
				message: true,
				messageContent: 'Please enter your name.'
			});
		} else if (!this.state.description) {
			this.setState({
				message: true,
				messageContent: 'Please enter your description.'
			});
		} else if (!this.state.email) {
			this.setState({
				message: true,
				messageContent: 'Please enter your email.'
			});
		} else if (!this.state.password) {
			this.setState({
				message: true,
				messageContent: 'Please enter a password.'
			});
		} else if (this.state.password.indexOf('$') !== -1) {
            this.setState({
				message: true,
				messageContent: 'Passwords cannot contain a $ symbol.'
			});
		} else if (this.state.password !== this.state.confirmPassword) {
			this.setState({
				message: true,
				messageContent: 'Please re-enter a matching password.'
			});
		// Commented Code: removed form validation for removed image upload on signup
		// } else if (!this.state.selectedFile) {
		// 	this.setState({
		// 		message: true,
		// 		messageContent: 'Please provide an image.'
		// 	});
		} else {

			// Commented Code: Attempt and uploading form data image directly to db
			// const fd = new FormData();
			// fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
			// console.log("This is fd: " + fd);

			// const imageToUpload = fs.readFileSync(this.state.selectedFile.name); 

			// const file = this.state.selectedFile;
			// console.log(file);
			// const fileData = new FormData();
			// fileData.append('file', file);
			// console.log("This is the file data" + fileData);

			const signUpInfo = {
				name: this.state.name,
				description: this.state.description,
				email: this.state.email,
				password: this.state.password,
                // image: fileData,
                // image: this.state.selectedFile
			};
			API.signUp(signUpInfo).then(response => {
				console.log("This is the api signup response: " + response);
				if (response.data.error) {
					this.setState({
						message: true,
						messageContent: response.data.error
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


					this.setState({
						redirectTo: '/dashboard'
					});
				} 
			}).catch(error => {
				this.setState({
					message: true,
					messageContent: 'Signup error.'
				});
				console.log('Signup error: ');
				console.log(error);
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
						<h3 className="card-title">Sign Up</h3>
						<form>
							{/* Commented Code: removed image upload on signup */}
							{/* <div className="form-group">
								<label htmlFor="imageUploadSignUpInput">Upload Image</label>
								<Input id="imageUploadSignUpInput" title="Image" name="Image" type="file" handleInput={this.handleSelectedFileInput}/>
							</div> */}
							<div className="form-group">
								<label htmlFor="nameSignupInput">Name</label>
								<Input id="nameSignupInput" title="Name" name="Name" type="text" value={this.state.name} handleInput={this.handleNameInput}/>
							</div>
							<div className="form-group">
								<label htmlFor="descriptionSignupInput">Description</label>
								<Input id="descriptionSignupInput" title="Description" name="Description" type="text" value={this.state.description} handleInput={this.handleDescriptionInput}/>
							</div>
							<div className="form-group">
								<label htmlFor="emailSignupInput">Email</label>
								<Input id="emailSignupInput" title="Email" name="Email" type="text" value={this.state.email} handleInput={this.handleEmailInput}/>
							</div>
							<div className="form-group">
								<label htmlFor="passwordSignupInput">Password</label>
								<Input id="passwordSignupInput" title="Password" name="Password" type="password" value={this.state.password} handleInput={this.handlePasswordInput}/>
							</div>
							<div className="form-group">
								<label htmlFor="confirmPasswordSignupInput">Confirm Password</label>
								<Input id="confirmPasswordSignupInput" title="Confirm Password" name="Confirm Password" type="password" value={this.state.confirmPassword} handleInput={this.handlePasswordConfirmInput}/>
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

export default SignUpForm;