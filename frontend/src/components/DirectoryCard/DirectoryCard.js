import React from 'react';

class DirectoryCard extends React.Component {
	render () {
		return (
            <div className="card mb-4">
                <div className="card-body">
                    {this.props.userInfo.image ? (	
                        "THERE'S AN IMAGE"
                    ) : (
                        "There is not an image"
                    )}<br/>
                    <b>Name:</b> {this.props.userInfo.name} <br/>
                    <b>Description:</b> {this.props.userInfo.description} <br/>
                    <b>Email:</b> {this.props.userInfo.email}
                    <br/>
                </div>
            </div>
		)
	}
};

export default DirectoryCard; 