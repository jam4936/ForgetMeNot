import React from 'react';
import "./Authentication.css"
import LineSeparator from "./LineSeparator/LineSeparator";
import GoogleSignIn from "./GoogleSignIn/GoogleSignIn"


class CreateAccount extends React.Component{
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }

    render() {
        return (
            <div className="AuthFormContainer">
                <form className="AuthForm">
                    <div className="AuthFormContent">
                        <h3 className="text-center">
                            Create Account
                        </h3>
                        <GoogleSignIn text="&nbsp;Sign Up With Google"></GoogleSignIn>
                        <LineSeparator text="Or"></LineSeparator>
                        <div id="signUpOptions">
                            <button id="spacing" type="button" className="btn btn-primary" disabled data-bs-toggle="button">Family</button>
                            <button id="spacing" type="button" className="btn btn-primary" disabled data-bs-toggle="button">Staff</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateAccount;