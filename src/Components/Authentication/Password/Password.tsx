import React from "react";
import './Password.css';

class Password extends React.Component <any,any>{
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            hidden: true,
            password: ''
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    handlePasswordChange(event:any) {
        this.setState({ password: event.target.value });
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    href={"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"}/>
                <div className="form-group">
                    <label>Password</label>
                    <div className="input-group">
                        <input
                            type={this.state.hidden ? 'password' : 'text'}
                            className="form-control rounded-right"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.handlePasswordChange}
                        />
                        <div className="input-group-addon">
                            <i className="bi bi-eye-slash" id="togglePassword" onClick={this.toggleShow}></i>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Password;