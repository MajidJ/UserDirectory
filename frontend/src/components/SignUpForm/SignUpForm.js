import React, { Component } from 'react';
import Input from '../Input'; 


class SignUpForm extends Component {
    state = {
		email: '',
		password: '',
		confirmPassword: '',
	};

    handleEmailInput = e => {
		this.setState({email: e.target.value});
	}

	handlePasswordInput = e => {
		this.setState({password: e.target.value});
    }
    
    handleSubmit = event => {
    }

    render() {
        return (
            <form>
                <Input title="Email" name="Email" type="text" value={this.state.email} handleInput={this.handleEmailInput}/>
                <Input title="Password" name="Password" type="password" value={this.state.password} handleInput={this.handlePasswordInput}/>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default SignUpForm;