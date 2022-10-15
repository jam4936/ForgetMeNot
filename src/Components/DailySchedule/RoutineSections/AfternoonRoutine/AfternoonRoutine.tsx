import React from "react";
import './AfternoonRoutine.css';
import '../../DailySchedule.css';

class AfternoonRoutine extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="multiLineQuestion">
                    <label htmlFor="AfternoonRoutine" id="question">Afternoon:</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="AfternoonRoutine" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default AfternoonRoutine;