import React from "react";
import './KindOfPhysicalActivity.css';
import '../Interests.css';

class KindOfPhysicalActivity extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="InterestsMultiLineQuestion">
                    <label htmlFor="KindOfPhysicalActivity" id="InterestsQuestion">What kinds of physical activity do you enjoy?</label>
                </div>
                <div id="InterestsMultiLineResponse">
                    <textarea name="KindOfPhysicalActivity" id="InterestsResponse">
                    </textarea>
                </div>
            </>
        )
    }
}

export default KindOfPhysicalActivity;