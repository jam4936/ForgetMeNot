import React from "react";
import './GardeningYardwork.css';
import '../../Interests.css';

class GardeningYardwork extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="InterestsOneLineSelect">
                <label htmlFor="GardeningYardwork" id="InterestsQuestion">Gardening and/or yardwork?</label>
                <div>
                    <select name="GardeningYardworkResponse" id="YesNo" defaultValue={"none"}>
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

export default GardeningYardwork;