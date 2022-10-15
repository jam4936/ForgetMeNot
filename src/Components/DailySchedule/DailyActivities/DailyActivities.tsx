import React from "react";
import './DailyActivities.css';
import '../DailySchedule.css';

class DailyActivities extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="multiLineQuestion">
                    <label htmlFor="DailyActivities" id="question">How do you like to spend your day?</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="DailyActivities" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default DailyActivities;