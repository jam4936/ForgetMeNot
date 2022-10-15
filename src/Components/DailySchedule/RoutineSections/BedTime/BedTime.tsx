import React from "react";
import './BedTime.css';
import '../../DailySchedule.css';

class BedTime extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="BedTime" id="question">Bedtime:</label>
                <input type="text" name="BedTime" id="response"/>
            </div>
        )
    }
}

export default BedTime;