import React from "react";
import './Birthplace.css';
import '../AboutYou.css';

class Birthplace extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="birthplace" id="question">Where were you born?</label>
                <input type="text" name="birthplace" id="response"/>
            </div>
        )
    }
}

export default Birthplace;