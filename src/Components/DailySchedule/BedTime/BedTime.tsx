import React from "react";
import './BedTime.css';
import '../DailySchedule.css';

class BedTime extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="bedtime" id="question">What time do you normally go to bed?</label>
                <input type="text" name="bedtime" id="response"/>
            </div>
        )
    }
}

export default BedTime;