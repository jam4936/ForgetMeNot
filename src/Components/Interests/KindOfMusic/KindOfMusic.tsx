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
                <div id="multiLineQuestion">
                    <label htmlFor="KindOfMusic" id="question">What kinds of music do you enjoy?</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="KindOfMusic" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default KindOfMusic;