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
                <div id="multiLineQuestion">
                    <label htmlFor="HasArt" id="question">Has art played a role in your life?</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="HasArt" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default HasArt;