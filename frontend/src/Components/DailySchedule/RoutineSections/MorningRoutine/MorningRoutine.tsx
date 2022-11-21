import React from "react";
import './MorningRoutine.css';
import '../../DailySchedule.css';

class MorningRoutine extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="DailyScheduleMultiLineQuestion">
                    <label htmlFor="MorningRoutine" id="DailyScheduleQuestion">Morning:</label>
                </div>
                <div id="DailyScheduleMultiLineResponse">
                    <textarea name="MorningRoutine" id={"DailyScheduleResponse"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default MorningRoutine;