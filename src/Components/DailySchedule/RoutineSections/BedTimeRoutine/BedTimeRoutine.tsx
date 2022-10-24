import React from "react";
import './BedTimeRoutine.css';
import '../../DailySchedule.css';

class BedTimeRoutine extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="DailyScheduleMultiLineQuestion">
                    <label htmlFor="BedTimeRoutine" id="DailyScheduleQuestion">Bedtime:</label>
                </div>
                <div id="DailyScheduleMultiLineResponse">
                    <textarea name="BedTimeRoutine" id={"DailyScheduleResponse"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default BedTimeRoutine;