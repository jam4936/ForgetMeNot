import React from "react";
import './Email.css';
import '../Login.css';

class Email extends React.Component {

    constructor(props: {} | Readonly<{}>){
        super(props)
    }


    render() {
        return (
            <div id="oneLineResponse">
                <input type="email" className="form-control mt-1" placeholder="Email/Username"/>
            </div>
        )
    }
}

export default Email;