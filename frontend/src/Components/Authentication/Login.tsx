import React, {ChangeEvent, useState} from 'react';
import "./Authentication.css"
import {login} from "../../Services/Authentication";
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateAccount from './CreateAccount';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createAccount, setCreateAccount] = useState(false);

    function handleLogin() {
        login(email, password)
    }
    const openCreateAccount = () =>{
        setCreateAccount(true);
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
                    <a id="createAccount" href="#" onClick={openCreateAccount}> Create Account</a>
                </div>
            </div>
            <Dialog open={createAccount}>
                <DialogTitle id="title">
                    <h2>Create Account</h2>
                        <IconButton onClick={ () => setCreateAccount(false)}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <CreateAccount></CreateAccount>
                </DialogContent>
            </Dialog>
        </div>

    )
}




export default Login;