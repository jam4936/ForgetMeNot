import React from "react";
import './MorningRoutine.css';
import '../../DailySchedule.css';

class MorningRoutine extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="multiLineQuestion">
                    <label htmlFor="MorningRoutine" id="question">Morning:</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="MorningRoutine" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default MorningRoutine;