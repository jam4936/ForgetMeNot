import React from "react";
import '../Authentication.css';

class Email extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="Email/Username"/>
            </div>
        )
    }
}

export default Email;