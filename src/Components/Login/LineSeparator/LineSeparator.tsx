import React from "react";
import './LineSeparator.css';

class LineSeparator extends React.Component {

    constructor(props: {} | Readonly<{}>){
        super(props)
    }


    render() {
        return (
            <div className="separator">
                <div className="line"></div>
                <p>Or Continue With</p>
                <div className="line"></div>
            </div>
        )
    }
}

export default LineSeparator;