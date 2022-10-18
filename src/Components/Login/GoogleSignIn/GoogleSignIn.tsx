import React from "react";
import './GoogleSignIn.css';
import googleLogo from "../../../Images/googleLogo.png";

class GoogleSignIn extends React.Component {

    constructor(props: {} | Readonly<{}>){
        super(props)
    }


    render() {
        return (
            <div className="googleButton">
                <button type="button" className="btn btn-link">
                    <img src={googleLogo}  alt={"GoogleLogo"}/>
                    <p>
                        Google
                    </p>
                </button>
            </div>
        )
    }
}

export default GoogleSignIn;