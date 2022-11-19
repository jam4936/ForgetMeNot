
import React from "react";
import './AboutYou.css';
import Question from "../../Models/Question";
import { TextField } from "@mui/material";

class AboutYou extends React.Component <{}, {isTablet: boolean}>{

    questions: Array<Question> = [
        {
            Question: "Where were you born?", 
            Size: "full", 
            Id:"born", 
            Type: "single-line-text"
        },
        {
            Question: "What languages do you speak?",
            Size: "full",
            Id: "languages",
            Type: "single-line-text"
        },
        {
            Question: "Do you have any siblings? What are their names? Are they older or younger?",
            Size: "full",
            Id: "siblings",
            Type: "multi-line-text"
        },
        {
            Question: "What is your occupation/work history?",
            Size: "full",
            Id: "work",
            Type: "multi-line-text"
        }

    ] as Array<Question>;

    getDropdownMenu(question: Question){
        
    }
    getSingleLineText(question: Question){
        return(
            <div id={question.Id} className={question.Type}>
                <label>
                    {question.Question}
                </label>
                <TextField className={question.Id} variant="outlined"/>
            </div>
        )
    }

    getMultiLineText(question: Question){
        return(
            <div id={question.Id} className={question.Type}>
                <label>
                    {question.Question}
                </label>
                <TextField className={question.Id} variant="outlined"  rows={4} multiline/>
            </div>
        )
    }
    makeQuestionComponent(question: Question){
        switch(question.Type){
            case "single-line-text":
                return this.getSingleLineText(question);
            case "multi-line-text":
                return this.getMultiLineText(question);
        }
    }

    render(): React.ReactNode {
       
        return(
            <div>
                <div id="aboutYou">
                    {this.questions.map(element =>{
                        return this.makeQuestionComponent(element)
                    })}
                </div>
            </div>        
        )
    }
   
    // render(){
    //     return (
    //         <div id="aboutYou">
    //             <Birthplace></Birthplace>
    //             <Language></Language>
    //             <PersonalityTraits></PersonalityTraits>
    //             <Education></Education>
    //             <Occupation></Occupation>
    //             <Military></Military>
    //             <Family></Family>
    //             <FoodPreference></FoodPreference>
    //             <Bathing></Bathing>
    //         </div>
    //     );
    // }
}

export default AboutYou;