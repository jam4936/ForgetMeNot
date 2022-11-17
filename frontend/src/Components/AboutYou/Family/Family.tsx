import React from "react";
import YesNo from "../../YesNo/YesNo";
import './Family.css';
class Family extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div>
                <div id="multiline-yesno">
                    <div id="yesNoQuestion">
                        <p>Do you have any children?</p>
                        <YesNo/>
                    </div>
                    <br/>
                    <div id="yesNoQuestion" className="followUp">
                        <p>Grandchildren?</p>
                        <YesNo/>
                    </div>
                </div>

                <div id="yesResponseMultiline">
                    <label htmlFor="branch">What are their names? How old are they?</label>
                    <textarea name="branch" id="yesResponseInput"></textarea>
                </div>

            </div>
        )
    }
}

export default Family;