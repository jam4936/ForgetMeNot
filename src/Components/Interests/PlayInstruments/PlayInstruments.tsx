import React from "react";
import './PlayInstruments.css';
import '../Interests.css';

class PlayInstruments extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="multiLineQuestion">
                    <label htmlFor="PlayInstruments" id="question">Do you play any instruments?</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="PlayInstruments" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default PlayInstruments;