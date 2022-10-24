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
                <div id="DailyScheduleMultiLineQuestion">
                    <label htmlFor="DailyActivities" id="DailyScheduleQuestion">How do you like to spend your day?</label>
                </div>
                <div id="DailyScheduleMultiLineResponse">
                    <textarea name="DailyActivities" id={"DailyScheduleResponse"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default DailyActivities;