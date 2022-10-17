import React from "react";
class Occupation extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div id="multilineResponse">
                <label htmlFor="occupation">What is your occupation/work history?</label>
                <textarea name="occupation" id="multilineResponseInput"></textarea>
            </div>
        )
    }
}

export default Occupation;