import React from 'react';
import "./Login.css"
import Email from "./Email/Email";
import Password from "./Password/Password";
import LineSeparator from "./LineSeparator/LineSeparator";
import GoogleSignIn from "./GoogleSignIn/GoogleSignIn"


class Login extends React.Component{
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }

    render() {
        return (
            <div className="AuthFormContainer">
                <form className="AuthForm">
                    <div className="AuthFormContent">
                        <h3 className="AuthFormTitle">
                            Sign In
                        </h3>
                        <Email></Email>
                        <Password></Password>
                        <button type="submit" className="btn btn-primary btn-block">
                            Submit
                        </button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                        <LineSeparator></LineSeparator>
                        <GoogleSignIn></GoogleSignIn>
                        <p id="createAccount">
                            Not registered yet? <a href="#">Create Account</a>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;