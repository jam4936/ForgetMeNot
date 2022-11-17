import React from "react";
import './Reading.css';
import '../../Interests.css';

class Reading extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="InterestsOneLineSelect">
                <label htmlFor="Reading" id="InterestsQuestion">Reading?</label>
                <div>
                    <select name="ReadingResponse" id="YesNo" defaultValue={"none"}>
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

export default Reading;