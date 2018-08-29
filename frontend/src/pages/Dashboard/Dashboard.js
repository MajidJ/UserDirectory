import React from 'react';
import Wrapper from '../../components/Wrapper'
import AccountInfoForm from '../../components/AccountInfoForm'
import DirectorySection from '../../components/DirectorySection'
import Jumbotron from '../../components/Jumbotron'


class Dashboard extends React.Component {
	render () {
		return (
            <Wrapper>
                <Jumbotron/>
                <AccountInfoForm
                    logout={this.props.logout}
                    updateUser={this.props.updateUser} 
                    userInfo={this.props.userInfo}
                />
                <DirectorySection userInfo={this.props.userInfo} />
            </Wrapper>
		)
	}
};

export default Dashboard; 