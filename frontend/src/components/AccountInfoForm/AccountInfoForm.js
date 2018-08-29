import React, { Component } from 'react';
import API from '../../utils/API';
import Input from '../Input'; 
import DirectoryUserCard from '../DirectoryUserCard'
import { Redirect } from 'react-router-dom';

class AccountInfoForm extends Component {
	state = {
        name: '',
        nameUpdating: '',
        description: '',
        descriptionUpdating: '',
        selectedFile: null,
        email: '',
        emailUpdating: '',
		message: false,
        messageContent: '',
        userId: '',
        image: '',
        redirectTo: null,
    };

    componentDidMount = () => {
        this.setState({
            userId: this.props.userInfo.userId,
            name: this.props.userInfo.name,
            nameUpdating: this.props.userInfo.name,
            description: this.props.userInfo.description,
            descriptionUpdating: this.props.userInfo.description,
            email: this.props.userInfo.email,
            emailUpdating: this.props.userInfo.email,
            image: this.props.userInfo.image
        });
        // this.updateAccountInfo();
    }

    updateAccountInfo = () => {
        this.setState({
            userId: this.props.userInfo.userId,
            name: this.props.userInfo.name,
            nameUpdating: this.props.userInfo.name,
            description: this.props.userInfo.description,
            descriptionUpdating: this.props.userInfo.description,
            email: this.props.userInfo.email,
            emailUpdating: this.props.userInfo.email,
            image: this.props.userInfo.image
        });
    }

	handleNameInput = e => {
		this.setState({nameUpdating: e.target.value});
	}

	handleDescriptionInput = e => {
		this.setState({descriptionUpdating: e.target.value});
	}

	handleEmailInput = e => {
		this.setState({emailUpdating: e.target.value});
    }

    handleSelectedFileInput = e => {
		this.setState({selectedFile: e.target.files[0]});
    }
    
    handleLogout = () => {
        API.logout().then(response => {
            console.log(response.data);
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    email: null,
                    name: null,
                    description: null,
                    image: null,
                    userId: null
                });
                // this.setState({
                //     redirectTo: '/'
                // });
            }
        }).catch(err => {
            console.log(`Logout error: ${err}`);
        });
    }

	handleSubmit = event => {
		event.preventDefault();
		this.setState({
			message: false,
			messageContent: ''
		});
		if (!this.state.nameUpdating) {
			this.setState({
				message: true,
				messageContent: 'Please enter your name.'
			});
		} else if (!this.state.descriptionUpdating) {
			this.setState({
				message: true,
				messageContent: 'Please enter a description.'
			});
		} else if (!this.state.emailUpdating) {
			this.setState({
				message: true,
				messageContent: 'Please enter an email.'
			});
		} else {
			// const userUpdatedInfo = {
			// 	userId: this.state.userId,
			// 	name: this.state.name,
            //     description: this.state.description,
            //     email: this.state.email
            // };
        	API.updateUserInfo(this.state.userId, this.state.nameUpdating, this.state.descriptionUpdating, this.state.emailUpdating).then(response => {
				if (response.status === 200) {
					if (response.data.message) {
						this.setState({
							message: true,
							messageContent: response.data.message
						});
					} else {
                		this.props.updateUser({
							email: response.data.email,
							name: response.data.name,
                            description: response.data.description,
                            image: response.data.image
                        });
                        this.updateAccountInfo();
					}
            	}
        	}).catch(err => {
				this.setState({
					message: true,
					messageContent: 'Save error.'
				});
            	console.log('Save error:');
            	console.log(err);    
			});
		}
    }

	render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else if (!this.props.userInfo.loggedIn) {
			return <Redirect to={{ pathname: '/' }} />
		} else {
            return (
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-9 col-md-10">
                                <h2 className="card-title">Welcome, {this.state.name}!</h2>
                            </div>
                            <div className="col-sm-3 col-md-2">
                                <button className="btn btn-outline-primary btn-lg" onClick={this.handleLogout}>Logout</button>
                            </div>
                        </div>
                        <hr/>
                        <h3>Account Info</h3>
                        <div className="row">
                            <div className="col-sm-4">
                                <DirectoryUserCard 
                                    userInfo={{
                                        name: this.state.name,
                                        description: this.state.description,
                                        email: this.state.email,
                                        image: this.state.image
                                    }}
                                />
                            </div>
                            <form className="col-sm-8">
                                <div className="form-group">
                                    <label htmlFor="imageUploadAccountInput">Change Thumbnail Image</label>
                                    <Input id="imageUploadAccountInput" title="Image" name="Image" type="file" handleInput={this.handleSelectedFileInput}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nameAccountInput">Name</label>
                                    <Input id="nameAccountInput" title="Name" name="name" type="text" value={this.state.nameUpdating} handleInput={this.handleNameInput}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descriptionAccountInput">Description</label>
                                    <Input id="descriptionAccountInput" title="Description" name="Description" type="text" value={this.state.descriptionUpdating} handleInput={this.handleDescriptionInput}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="emailAccountInput">Email Address</label>
                                    <Input id="emailAccountInput" title="Email" name="Email" type="email" value={this.state.emailUpdating} handleInput={this.handleEmailInput}/>
                                </div>
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Update</button>
                            </form>
                            {this.state.message ? (
                                <p className="mt-2" style={{color:"red"}}>{this.state.messageContent}</p>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
	}
};

export default AccountInfoForm;