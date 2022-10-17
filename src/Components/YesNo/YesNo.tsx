import React from "react";


class YesNo extends React.Component <{}, {isTablet: boolean}>{
    render(){
        return (
            <div>
                <select value={""}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
        );
    }
}

export default YesNo;