import React from "react";
import './Meditation.css';
import '../../Interests.css';
import YesNo from "../../../YesNo/YesNo";

class Meditation extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="Meditation" id="question">Meditation?</label>
                <YesNo/>
            </div>
        )
    }
}

export default Meditation;