import React from "react";
import './BedTime.css';
import '../DailySchedule.css';

class BedTime extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="DailyScheduleOneLineResponse">
                <label htmlFor="bedtime" id="DailyScheduleQuestion">What time do you normally go to bed?</label>
                <input type="text" name="bedtime" id="DailyScheduleResponse"/>
            </div>
        )
    }
}

export default BedTime;