import React, {ChangeEvent, useState} from 'react';
import "./Authentication.css"
import Email from "./Email/Email";
import Password from "./Password/Password";
import LineSeparator from "./LineSeparator/LineSeparator";
import GoogleSignIn from "./GoogleSignIn/GoogleSignIn"
import {login} from "../../Services/Authentication";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        console.log('Hellloooooo')
        login(email, password)
    }

    return (
        <div className="AuthFormContainer">
            <div className="AuthForm">
                <div className="AuthFormContent">
                    <h3 className="AuthFormTitle">
                        Sign In
                    </h3>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" onChange={(evt) => {setEmail(evt.target.value)}} className="form-control" placeholder="Email" value={email}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password"  onChange={(evt) => {setPassword(evt.target.value)}} value={password}/>
                    </div>
                    <button onClick={handleLogin} className="btn btn-primary btn-block">
                        Login
                    </button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                    <p id="createAccount">Not registered yet? </p>
                    <a id="createAccount" href="createAccount"> Create Account</a>
                </div>
            </div>
        </div>
    )
}




export default Login;