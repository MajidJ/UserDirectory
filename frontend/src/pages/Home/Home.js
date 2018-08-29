import React from 'react';
import Wrapper from '../../components/Wrapper'
import SignUpForm from '../../components/SignUpForm'
import LoginForm from '../../components/LoginForm'
import Jumbotron from '../../components/Jumbotron'

class Home extends React.Component {
	render () {
		return (
            <Wrapper>
                <Jumbotron/>
                <div className="row">
                    <div className="col-sm-6">
                        <SignUpForm
                            updateUser={this.props.updateUser} 
                            userInfo={this.props.userInfo}
                        />
                    </div>
                    <div className="col-sm-6">
                        <LoginForm
                            updateUser={this.props.updateUser} 
                            userInfo={this.props.userInfo}
                        />
                    </div>
                </div>
            </Wrapper>
		)
	}
};

export default Home; 