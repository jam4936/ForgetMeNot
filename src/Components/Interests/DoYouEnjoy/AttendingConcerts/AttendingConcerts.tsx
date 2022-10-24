import React from "react";
import './AttendingConcerts.css';
import '../../Interests.css';

class AttendingConcerts extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="InterestsOneLineSelect">
                <label htmlFor="AttendingConcerts" id="InterestsQuestion">Attending concerts?</label>
                <div>
                    <select name="AttendingConcertsResponse" id="YesNo" defaultValue={"none"}>
                        <option value="none" disabled hidden>Select an Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="indifferent">Indifferent</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default AttendingConcerts;