import React from "react";
import './KindOfMusic.css';
import '../Interests.css';

class KindOfMusic extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="InterestsMultiLineQuestion">
                    <label htmlFor="KindOfMusic" id="InterestsQuestion">What kinds of music do you enjoy?</label>
                </div>
                <div id="InterestsMultiLineResponse">
                    <textarea name="KindOfMusic" id={"InterestsResponse"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default KindOfMusic;