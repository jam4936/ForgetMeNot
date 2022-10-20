import React from "react";
import './GardeningYardwork.css';
import '../../Interests.css';
import YesNo from "../../../YesNo/YesNo";

class GardeningYardwork extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="GardeningYardwork" id="question">Gardening and/or yardwork?</label>
                <YesNo></YesNo>
            </div>
        )
    }
}

export default GardeningYardwork;