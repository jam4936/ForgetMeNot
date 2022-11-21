import React from "react";
import './EveningRoutine.css';
import '../../DailySchedule.css';

class EveningRoutine extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="DailyScheduleMultiLineQuestion">
                    <label htmlFor="EveningRoutine" id="DailyScheduleQuestion">Evening:</label>
                </div>
                <div id="DailyScheduleMultiLineResponse">
                    <textarea name="EveningRoutine" id={"DailyScheduleResponse"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default EveningRoutine;