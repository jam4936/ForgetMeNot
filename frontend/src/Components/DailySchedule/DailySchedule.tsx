import React from "react";
import './DailySchedule.css';
import Question from "../../Models/Question";
import { TextField, MenuItem, Select } from "@mui/material";
import DynamoResponse from "../../Models/DynamoResponse";

class DailySchedule extends React.Component <{}, {isTablet: boolean, questions: Question[]}>{

    constructor(props: any) {
        super(props);
        this.state = {
            isTablet: false,
            questions: [],
        }
        this.initializeQuestions()
    }

    async initializeQuestions() {
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/question/section/DailySchedule', {method: 'GET'}).then(result => result.json());
        this.setState({questions: temp.Items.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)})
    }

    getSelect(question: Question){
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label>
                    {question.prompt}
                </label>
                <Select id={question.id.toString()} className={question.questionType} defaultValue={"none"}>
                    <MenuItem value="none" disabled hidden>Select an Option</MenuItem>
                    {question.selectOptions?.map(element => { return <MenuItem value={element}>{element}</MenuItem> })}
                </Select>
            </div>
        )
    }

    getSingleLine(question: Question){
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label>
                    {question.prompt}
                </label>
                <TextField id={question.id.toString()} className={question.questionType} variant="outlined"/>
            </div>
        )
    }

    getMultiLine(question: Question){
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label>
                    {question.prompt}
                </label>
                <TextField id={question.id.toString()} className={question.questionType} variant="outlined"  rows={4} multiline/>
            </div>
        )
    }
    makeQuestionComponent(question: Question){
        switch(question.questionType){
            case "singleLine":
                return this.getSingleLine(question);
            case "multiLine":
                return this.getMultiLine(question);
            case "select":
                return this.getSelect(question);
        }
    }

    render(): React.ReactNode {
        return(
            <div>
                <div id="dailySchedule">
                    {this.state.questions.map(element =>{
                        return this.makeQuestionComponent(element)
                    })}
                </div>
            </div>
        )
    }

}

export default DailySchedule;