import React from "react";
import './PhysicalActivity.css';
import '../../Interests.css';
import YesNo from "../../../YesNo/YesNo";

class PhysicalActivity extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="PhysicalActivity" id="question">Physical activity?</label>
                <YesNo/>
            </div>
        )
    }
}

export default PhysicalActivity;