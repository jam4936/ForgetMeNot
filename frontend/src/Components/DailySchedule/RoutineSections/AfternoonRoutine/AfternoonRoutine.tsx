import React from "react";
import './AfternoonRoutine.css';
import '../../DailySchedule.css';

class AfternoonRoutine extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="DailyScheduleMultiLineQuestion">
                    <label htmlFor="AfternoonRoutine" id="DailyScheduleQuestion">Afternoon:</label>
                </div>
                <div id="DailyScheduleMultiLineResponse">
                    <textarea name="AfternoonRoutine" id={"DailyScheduleResponse"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default AfternoonRoutine;