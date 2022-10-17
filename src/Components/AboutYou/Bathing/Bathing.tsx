import React from "react";
class Bathing extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div id="singleLineResponse">
                <label htmlFor="bathing">Do you prefer a bath or shower?</label>
                <select name="bathing">
                    <option value="">---Select One---</option>
                    <option value="bath">Bath</option>
                    <option value="shower">Shower</option>
                </select>
            </div>
        )
    }
}

export default Bathing;