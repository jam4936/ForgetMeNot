import React from "react";
import './PersonalTrainer.css';
import '../Interests.css';

class PersonalTrainer extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="InterestsMultiLineQuestion">
                    <label htmlFor="PersonalTrainer" id="InterestsQuestion">Have you ever worked with a personal trainer?</label>
                </div>
                <div id="InterestsMultiLineResponse">
                    <textarea name="PersonalTrainer" id="InterestsResponse">
                    </textarea>
                </div>
            </>
        )
    }
}

export default PersonalTrainer;