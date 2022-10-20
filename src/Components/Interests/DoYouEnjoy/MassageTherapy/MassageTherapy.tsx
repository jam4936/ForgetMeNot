import React from "react";
import './MassageTherapy.css';
import '../../Interests.css';
import YesNo from "../../../YesNo/YesNo";

class MassageTherapy extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="MassageTherapy" id="question">Massage therapy?</label>
                <YesNo/>
            </div>
        )
    }
}

export default MassageTherapy;