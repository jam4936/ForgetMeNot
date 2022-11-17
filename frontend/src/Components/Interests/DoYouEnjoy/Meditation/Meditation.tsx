import React from "react";
import './Meditation.css';
import '../../Interests.css';

class Meditation extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="InterestsOneLineSelect">
                <label htmlFor="Meditation" id="InterestsQuestion">Meditation?</label>
                <div>
                    <select name="MeditationResponse" id="YesNo" defaultValue={"none"}>
                        <option value="none" disabled hidden>Select an Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="indifferent">Indifferent</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Meditation;