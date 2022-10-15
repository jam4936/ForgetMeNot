import React from "react";
import './EveningRoutine.css';
import '../../DailySchedule.css';

class EveningRoutine extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="multiLineQuestion">
                    <label htmlFor="EveningRoutine" id="question">Evening:</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="EveningRoutine" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default EveningRoutine;