import React from "react";
import './AvidTraveler.css';
import '../Interests.css';
import YesNo from "../../YesNo/YesNo";

class AvidTraveler extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <div id="oneLineSelect">
                <label htmlFor="AvidTraveler" id="question">Are you an avid traveler?</label>
                <YesNo/>
            </div>
        )
    }
}

export default AvidTraveler;