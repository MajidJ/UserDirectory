import React from 'react';

class FileInput extends React.Component {
	render () {
		return (
            <div class="custom-file">
                <input  
                    label={this.props.title} 
                    className="custom-file-input form-control"
                    id="fileInputGroup1"
                    placeholder={this.props.title} 
                    name={this.props.name} 
                    type={this.props.type} 
                    value={this.props.value} 
                    onChange={this.props.handleInput} 
                    aria-label="Input field" 
                />
                <label class="custom-file-label" htmlFor="fileInputGroup1">Choose file</label>
            </div>
		)
	}
};

export default FileInput; 