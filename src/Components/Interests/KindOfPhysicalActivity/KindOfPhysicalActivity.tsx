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
                <div id="multiLineQuestion">
                    <label htmlFor="KindOfPhysicalActivity" id="question">What kinds of physical activity do you enjoy?</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="KindOfPhysicalActivity" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default KindOfPhysicalActivity;