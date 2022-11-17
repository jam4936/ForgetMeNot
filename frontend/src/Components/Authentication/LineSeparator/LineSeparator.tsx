import React from "react";
import './LineSeparator.css';

class LineSeparator extends React.Component <{text: string}, {}>{

    render() {
        return (
            <div className="separator">
                <div className="line"></div>
                <label>{this.props.text}</label>
                <div className="line"></div>
            </div>
        )
    }
}

export default LineSeparator;