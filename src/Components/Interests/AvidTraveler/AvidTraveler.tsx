import React from "react";
import './AvidTraveler.css';
import '../Interests.css';

class AvidTraveler extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="InterestsOneLineSelect">
                <label htmlFor="AvidTraveler" id="InterestsQuestion">Are you an avid traveler?</label>
                <div>
                    <select name="AvidTravelerResponse" id="YesNo" defaultValue={"none"}>
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

export default AvidTraveler;