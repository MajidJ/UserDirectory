import React from 'react';

class Input extends React.Component {
	render () {
		return (
            <input  
                label={this.props.title} 
                type={this.props.type} 
                value={this.props.value} 
                onChange={this.props.handleInput} 
                aria-label="Input field" 
            />
		)
	}
};

export default Input; 