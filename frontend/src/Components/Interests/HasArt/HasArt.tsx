import React from "react";
import './HasArt.css';
import '../Interests.css';

class HasArt extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="InterestsMultiLineQuestion">
                    <label htmlFor="HasArt" id="InterestsQuestion">Has art played a role in your life?</label>
                </div>
                <div id="InterestsMultiLineResponse">
                    <textarea name="HasArt" id="InterestsResponse">
                    </textarea>
                </div>
            </>
        )
    }
}

export default HasArt;