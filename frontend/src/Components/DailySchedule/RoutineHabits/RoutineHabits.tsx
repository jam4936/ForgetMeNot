import React from "react";
import './RoutineHabits.css';
import '../DailySchedule.css';

class RoutineHabits extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="DailyScheduleMultiLineQuestion">
                    <label htmlFor="RoutineHabits" id="DailyScheduleQuestion">Are there any habits, routines, or rituals that would be important to incorporate into your daily schedule?</label>
                </div>
                <div id="DailyScheduleMultiLineResponse">
                    <textarea name="RoutineHabits" id={"DailyScheduleResponse"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default RoutineHabits;