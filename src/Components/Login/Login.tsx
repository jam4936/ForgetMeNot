import React from 'react';
import Email from "./Email/Email";
import Password from "./Password/Password";

function Login() {
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <Email></Email>
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <Password></Password>
                    </div>
                    <div>
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;