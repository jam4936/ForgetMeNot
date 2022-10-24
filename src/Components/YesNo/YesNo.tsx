import React from "react";
import "./YesNo.css"

class YesNo extends React.Component <{}, {isTablet: boolean}>{
    render(){
        return (
            <div>
                <select id="YesNo" defaultValue={"none"}>
                    <option value="none" disabled hidden>Select an Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="indifferent">Indifferent</option>
                </select>
            </div>
        );
    }
}

export default YesNo;