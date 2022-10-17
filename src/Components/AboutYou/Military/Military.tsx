import React from "react";
import YesNo from "../../YesNo/YesNo";
import './Military.css';
class Military extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div>
                <div id="yesNoQuestion">
                    <p>Where you in the military?</p>
                    <YesNo/>
                </div>
                

                <div id="yesResponse">
                    <label htmlFor="branch">Which branch?</label>
                    <textarea name="branch" id="singleLineResponse"></textarea>
                </div>

            </div>
        )
    }
}

export default Military;