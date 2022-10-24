import React from "react";
import './MassageTherapy.css';
import '../../Interests.css';

class MassageTherapy extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="InterestsOneLineSelect">
                <label htmlFor="MassageTherapy" id="InterestsQuestion">Massage therapy?</label>
                <div>
                    <select name="MassageTherapyResponse" id="YesNo" defaultValue={"none"}>
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

export default MassageTherapy;