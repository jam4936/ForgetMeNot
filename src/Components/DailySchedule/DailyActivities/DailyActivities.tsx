import React from "react";
import './DailyActivities.css';
import '../DailySchedule.css';

class DailyActivities extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="DailyActivities" id="question">How do you like to spend your day?</label>
                <input type="text" name="DailyActivities" id="response"/>
            </div>
        )
    }
}

export default DailyActivities;