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
                <div id="multiLineQuestion">
                    <label htmlFor="PersonalTrainer" id="question">Have you ever worked with a personal trainer?</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="PersonalTrainer" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default PersonalTrainer;