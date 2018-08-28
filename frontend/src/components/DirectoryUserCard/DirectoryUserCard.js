import React from 'react';
import ThumbnailPlaceholder from '../../assets/images/thumbnail-placeholder.png'

class DirectoryUserCard extends React.Component {
	render () {
		return (
            <div className="card mb-4">
                {this.props.userInfo.image ? (	
                    <img className="card-img-top" alt="user thumbnail" src={ThumbnailPlaceholder} />
                ) : (
                    <img className="card-img-top" alt="user thumbnail" src={ThumbnailPlaceholder} />
                )}
                <div className="card-body">
                    <h5 className="card-title">{this.props.userInfo.name}</h5> <br/>
                    <b>Description:</b> {this.props.userInfo.description} <br/>
                    <b>Email:</b> {this.props.userInfo.email}
                    <br/>
                </div>
            </div>
		)
	}
};

export default DirectoryUserCard; 