import React from "react";
import './Yoga.css';
import '../../Interests.css';
import YesNo from "../../../YesNo/YesNo";

class Yoga extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="Yoga" id="question">Yoga?</label>
                <YesNo/>
            </div>
        )
    }
}

export default Yoga;