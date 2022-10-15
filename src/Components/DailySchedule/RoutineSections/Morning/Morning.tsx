import React from "react";
import './Morning.css';
import '../../DailySchedule.css';

class Morning extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="Morning" id="question">Morning:</label>
                <input type="text" name="Morning" id="response"/>
            </div>
        )
    }
}

export default Morning;