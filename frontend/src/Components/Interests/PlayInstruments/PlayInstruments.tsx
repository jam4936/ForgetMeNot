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
                <div id="InterestsMultiLineQuestion">
                    <label htmlFor="PlayInstruments" id="InterestsQuestion">Do you play any instruments?</label>
                </div>
                <div id="InterestsMultiLineResponse">
                    <textarea name="PlayInstruments" id="InterestsResponse">
                    </textarea>
                </div>
            </>
        )
    }
}

export default PlayInstruments;