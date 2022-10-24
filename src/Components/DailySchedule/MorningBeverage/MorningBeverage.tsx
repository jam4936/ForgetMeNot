import React from "react";
import './MorningBeverage.css';
import '../DailySchedule.css';

class MorningBeverage extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="DailyScheduleOneLineResponse">
                <label htmlFor="MorningBeverage" id="DailyScheduleQuestion">Do you have a morning beverage of choice?</label>
                <input type="text" name="MorningBeverage" id="DailyScheduleResponse"/>
            </div>
        )
    }
}

export default MorningBeverage;