import React from "react";
import './BedTimeRoutine.css';
import '../../DailySchedule.css';

class BedTimeRoutine extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="multiLineQuestion">
                    <label htmlFor="BedTimeRoutine" id="question">Bedtime:</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="BedTimeRoutine" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default BedTimeRoutine;