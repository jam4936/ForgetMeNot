import React from "react";
import './Afternoon.css';
import '../../DailySchedule.css';

class Afternoon extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="Afternoon" id="question">Afternoon:</label>
                <input type="text" name="Afternoon" id="response"/>
            </div>
        )
    }
}

export default Afternoon;