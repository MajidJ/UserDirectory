import React from 'react';
import DirectoryUserCard from '../DirectoryUserCard'

class DirectorySection extends React.Component {
	render () {
		return (
            <div className="card mb-5">
                <div className="card-body">
                    <h3 className="card-title">Directory</h3>
                    <div className="row">
                        {this.props.userInfo.users.map(user => (
                        <div className="col-md-6 col-lg-4" key={'user-' + user._id}>
                            <DirectoryUserCard userInfo={user}/>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
		)
	}
};

export default DirectorySection; 