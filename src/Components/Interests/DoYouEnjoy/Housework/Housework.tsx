import React from "react";
import './Housework.css';
import '../../Interests.css';
import YesNo from "../../../YesNo/YesNo";

class Housework extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="Housework" id="question">Housework?</label>
                <YesNo/>
            </div>
        )
    }
}

export default Housework;