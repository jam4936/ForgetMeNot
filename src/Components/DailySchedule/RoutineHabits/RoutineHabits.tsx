import React from "react";
import './RoutineHabits.css';
import '../DailySchedule.css';

class RoutineHabits extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="RoutineHabits" id="question">Are there any habits, routines, or rituals that would be important to incorporate into your daily schedule?</label>
                <input type="text" name="RoutineHabits" id="response"/>
            </div>
        )
    }
}

export default RoutineHabits;