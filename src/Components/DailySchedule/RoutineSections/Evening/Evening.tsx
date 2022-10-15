import React from "react";
import './Evening.css';
import '../../DailySchedule.css';

class Evening extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="Evening" id="question">Evening:</label>
                <input type="text" name="Evening" id="response"/>
            </div>
        )
    }
}

export default Evening;