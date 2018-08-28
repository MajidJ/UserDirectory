import React, { Component } from 'react';
import API from '../../utils/API';
import Input from '../Input'; 

class AccountInfoForm extends Component {
	state = {
        name: '',
        description: '',
        selectedFile: null,
        email: '',
		message: false,
        messageContent: '',
        userId: '',
        image: '',
    };

    componentDidMount = () => {
        this.setState({
            userId: this.props.userInfo.userId,
            name: this.props.userInfo.name,
            description: this.props.userInfo.description,
            email: this.props.userInfo.email,
            image: this.props.userInfo.image
        });
    }

	handleNameInput = e => {
		this.setState({name: e.target.value});
	}

	handleDescriptionInput = e => {
		this.setState({description: e.target.value});
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value});
    }

    handleSelectedFileInput = e => {
		this.setState({selectedFile: e.target.files[0]});
	}

	handleSubmit = event => {
		event.preventDefault();
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
				messageContent: 'Please enter a description.'
			});
		} else if (!this.state.email) {
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
        	API.updateUserInfo(this.state.userId, this.state.name, this.state.description, this.state.email).then(response => {
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
							description: response.data.description
                		});
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
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-9 col-md-10">
                            <h2 className="card-title">Welcome, {this.state.name}!</h2>
                        </div>
                        <div className="col-sm-3 col-md-2">
                            <button className="btn btn-outline-primary btn-lg" onClick={this.props.logout}>Logout</button>
                        </div>
                    </div>
                    <hr/>
                    <h3>Account Info</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="imageUploadAccountInput">Change Thumbnail Image</label>
                            <Input id="imageUploadAccountInput" title="Image" name="Image" type="file" handleInput={this.handleSelectedFileInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nameAccountInput">Name</label>
                            <Input id="nameAccountInput" title="Name" name="name" type="text" value={this.state.name} handleInput={this.handleNameInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="descriptionAccountInput">Description</label>
                            <Input id="descriptionAccountInput" title="Description" name="Description" type="text" value={this.state.description} handleInput={this.handleDescriptionInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailAccountInput">Email Address</label>
                            <Input id="emailAccountInput" title="Email" name="Email" type="email" value={this.state.email} handleInput={this.handleEmailInput}/>
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
        )
	}
};

export default AccountInfoForm;