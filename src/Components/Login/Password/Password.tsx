import React from "react";
import './Password.css';
import '../Login.css';

class Password extends React.Component {

    constructor(props: {} | Readonly<{}>){
        super(props)
    }


    render() {
        return (
            <div>
                <input type="password" className="form-control mt-1" placeholder="Password"/>
            </div>
        )
    }
}

export default Password;