import React from "react";
import './GoogleSignIn.css';
import googleLogo from "../../../Assets/googleLogo.png";

class GoogleSignIn extends React.Component <{text: string}, {}>{

    render() {
        return (
            <div className="googleButton">
                <button type="button" className="btn btn-link">
                    <img src={googleLogo}  alt={"GoogleLogo"}/>
                    <p>
                        {this.props.text}
                    </p>
                </button>
            </div>
        )
    }
}

export default GoogleSignIn;