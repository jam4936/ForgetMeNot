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
                <div id="multiLineQuestion">
                    <label htmlFor="RoutineHabits" id="question">Are there any habits, routines, or rituals that would be important to incorporate into your daily schedule?</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="RoutineHabits" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default RoutineHabits;