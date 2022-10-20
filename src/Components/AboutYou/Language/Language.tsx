import React from "react";
import './Language.css';
class Language extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div id="oneLineResponse">
                <label htmlFor="language" id="question">What languages do you speak?</label>
                <input type="text" name="language" id="response"/>
            </div>
        )
    }
}

export default Language;