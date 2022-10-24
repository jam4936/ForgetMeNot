import React from "react";
import './Thumbnail.css';

class Thumbnail extends React.Component <{image: string}, {}>{

    render() {
        return (
            <div key={this.props.image} className="thumbnail">
                <img src={this.props.image} height="200" alt="upload" />
                <button type="button" className="btn btn-circle btn-sm" id="delete">X</button>
            </div>
        )
    }
}

export default Thumbnail;