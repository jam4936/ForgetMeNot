
import { useState } from "react";
import './AboutYou.css';
import Question from "../../Models/Question";
import Response from "../../Models/Response"
import { MenuItem, Select, TextField } from "@mui/material";
import PersonalityTraits from "./PersonalityTraits/PersonalityTraits";
import SendResponse from "../../Models/SendResponse";
import UploadResponseService from "../../Services/UploadResponseService";
import GetQuestions from "../../Services/GetQuestions";
import GetResponses from "../../Services/GetResponses"
import Patient from "../../Models/Patient";
import spinner from "../../Images/loadingspinner.gif"

export const AboutYou = (patient : Patient, allowInput: boolean) => {

    const [questions, setQuestions] = useState<Question[]>();
    const [responses, setResponses] = useState<Response[]>();

    var personalityTraits : Question[] = [];

    const initializeResponses = async () => {
        await GetResponses.initializeResponses(patient.id.toString());
        setResponses(GetResponses.responses.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    }

    const initializeQuestions = async () => {
         await GetQuestions.initializeQuestions("AboutYou");
         setQuestions(GetQuestions.questions.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    }

    // only call database once
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const initializeData = async () => {
        //initializes the response
        await initializeResponses();
        //initializes the questions
        await initializeQuestions();
        // set data as loaded
        setDataLoaded(true);
    }

    if(!dataLoaded) initializeData();

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
            responses?.push({questionID: question.id, response: "none", patientID: patient.id, id: Number(String(patient.id) + String(question.id))} as Response);
            return "none";
        }else if (question.questionType === "checkbox")
        {
            responses?.push({questionID: question.id, response: "0", patientID: patient.id, id: Number(String(patient.id) + String(question.id))} as Response);
            return "0";
        }
        responses?.push({questionID: question.id, response: "", patientID: patient.id, id: Number(String(patient.id) + String(question.id))} as Response);
        return "";
    }

    const getSelect = (question: Question, response: string) =>{
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label>
                    {question.prompt}
                </label>
                <Select id={question.id.toString()} className={question.questionType} defaultValue={ response } disabled={!allowInput}  onChange={(event) => onBlurEvent(event.target.value, question.id)}>
                    <MenuItem value="none" disabled hidden>Select an Option</MenuItem>
                    {question.selectOptions?.map(element => { return <MenuItem value={element}>{element}</MenuItem> })}
                </Select>
            </div>
        )
    }

    const getSingleLine = (question: Question, response: string) => {
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label htmlFor={question.id.toString()}>
                    {question.prompt}
                </label>
                <TextField id={question.id.toString() + "_resp"} defaultValue={ response } disabled={!allowInput} className={question.questionType}  onBlur={(event) => onBlurEvent(event.target.value, question.id)} variant="outlined"/>
            </div>
        )
    }

    const getMultiLine = (question: Question, response: string) => {
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label>
                    {question.prompt}
                </label>
                <TextField id={question.id.toString() + "_resp"} defaultValue={ response } disabled={!allowInput}  className={question.questionType}  variant="outlined" onBlur={(event) => onBlurEvent(event.target.value, question.id)} rows={4} multiline/>
            </div>
        )
    }

    const makeQuestionComponent = (question: Question) =>{
        let response = findResponse(question);
        switch(question.questionType){
            case "singleLine":
                return getSingleLine(question, response);
            case "multiLine":
                return getMultiLine(question, response);
            case "select":
                return getSelect(question, response);
            case "checkbox":
                personalityTraits.push(question);
        }
    }

    if(!dataLoaded) {
        return (
            <div>
                <img id="spinner" src={spinner} alt="loading..."/>
            </div>
        )
    }else{
        return (
            <div>
                <div id="aboutYou">
                    <form className="AboutYou">
                        {questions?.map((element: Question) =>{
                            return makeQuestionComponent(element)
                        })}
                        <PersonalityTraits traits={personalityTraits} responses={responses}></PersonalityTraits>
                    </form>
                </div>
            </div>
        )
    }
    //
}