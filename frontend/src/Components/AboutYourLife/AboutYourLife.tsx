
import { useState } from "react";
import './AboutYourLife.css';
import Question from "../../Models/Question";
import { MenuItem, Select, TextField } from "@mui/material";
import SendResponse from "../../Models/SendResponse";
import UploadResponseService from "../../Services/UploadResponseService";
import GetQuestions from "../../Services/GetQuestions";
import Response from "../../Models/Response";
import GetResponses from "../../Services/GetResponses";
import Patient from "../../Models/Patient";
export const AboutYourLife = (patient : Patient) => {
    const [questions, setQuestions] = useState<Question[]>();
    const [responses, setResponses] = useState<Response[]>();

    const initializeResponses = async () => {
        await GetResponses.initializeResponses(patient.id.toString());
        setResponses(GetResponses.responses.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

    }
    //initializes the response
    initializeResponses();

    const initializeQuestions = async () => {
        await GetQuestions.initializeQuestions("AboutYourLife");
        setQuestions(GetQuestions.questions.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

    }
    //initializes the questions
    initializeQuestions();

    const onBlurEvent = (value: string, question : Number) => {
        console.log(value)

        var change = { questionId: question, response: value} as SendResponse
        // var traits : SendResponse[] = []

        UploadResponseService.setFormDirty(change, value)

    }

    const findResponse = (question: Question) : string =>{
        let response = responses?.find((x) => x.questionID === question.id)?.response;
        if(response != undefined){
            return response;
        }
        else if(question.questionType === "select")
        {
            return "none"
        }
        return "";
    }

    const getSelect = (question: Question) =>{
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label>
                    {question.prompt}
                </label>
                <Select id={question.id.toString()} className={question.questionType} defaultValue={ findResponse(question) } onChange={(event) => onBlurEvent(event.target.value, question.id)}>
                    <MenuItem value="none" disabled hidden>Select an Option</MenuItem>
                    {question.selectOptions?.map(element => { return <MenuItem value={element}>{element}</MenuItem> })}
                </Select>
            </div>
        )
    }
    const getSingleLine = (question: Question) => {
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label htmlFor={question.id.toString()}>
                    {question.prompt}
                </label>
                <TextField id={question.id.toString() + "_resp"} defaultValue={ findResponse(question) } className={question.questionType}  onBlur={(event) => onBlurEvent(event.target.value, question.id)} variant="outlined"/>
            </div>
        )
    }
    const getMultiLine = (question: Question) => {
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label>
                    {question.prompt}
                </label>
                <TextField id={question.id.toString() + "_resp"} defaultValue={ findResponse(question) } className={question.questionType}  variant="outlined" onBlur={(event) => onBlurEvent(event.target.value, question.id)} rows={4} multiline/>
            </div>
        )
    }

    const makeQuestionComponent = (question: Question) =>{
        switch(question.questionType){
            case "singleLine":
                return getSingleLine(question);
            case "multiLine":
                return getMultiLine(question);
            case "select":
                return getSelect(question);
        }
    }
    return (
        <div>
            <div id="aboutYourLife">
                <form className="AboutYourLife">
                    {questions?.map(element =>{
                        return makeQuestionComponent(element)
                    })}
                </form>
            </div>
        </div>
    )
}