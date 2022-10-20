import React from "react";
import './SignificantPlaces.css';
class SignificantPlaces extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div id="multilineResponse">
                {/* <label htmlFor="significantPlaces">Are there any significant places in your life?</label>
                <textarea name="significantPlaces" id="multilineResponseInput"></textarea> */}
            </div>
        )
    }
}

export default SignificantPlaces;