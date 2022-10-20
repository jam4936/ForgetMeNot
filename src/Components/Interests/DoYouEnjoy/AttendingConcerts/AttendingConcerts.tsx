import React from "react";
import './AttendingConcerts.css';
import '../../Interests.css';
import YesNo from "../../../YesNo/YesNo";

class AttendingConcerts extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="AttendingConcerts" id="question">Attending concerts?</label>
                <YesNo/>
            </div>
        )
    }
}

export default AttendingConcerts;