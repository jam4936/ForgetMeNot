import React from "react";
import './Reading.css';
import '../../Interests.css';
import YesNo from "../../../YesNo/YesNo";

class Reading extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="Reading" id="question">Reading?</label>
                <YesNo/>
            </div>
        )
    }
}

export default Reading;