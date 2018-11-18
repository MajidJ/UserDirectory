import React from 'react';

class Input extends React.Component {
	render () {
		return (
            <input  
                label={this.props.title} 
                className={this.props.type === "file" ? ("form-control-file"):("form-control")}
                placeholder={this.props.title} 
                name={this.props.name} 
                type={this.props.type} 
                value={this.props.value} 
                onChange={this.props.handleInput} 
                aria-label="Input field" 
            />
		)
	}
};

export default Input; 