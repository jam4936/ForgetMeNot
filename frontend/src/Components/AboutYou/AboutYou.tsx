
import { useEffect, useState } from "react";
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
function AboutYou(props: any) {
    const patient = props.patient;
    const allowInput = props.allowInput;
    
    const [questions, setQuestions] = useState([] as Question[]);

    const [responses, setResponses] = useState([] as Response[]);

    var personalityTraits : Question[] = [];
    var personalityResponses : Response[] = []
    // only call database once
    const [dataLoaded, setDataLoaded] = useState(false);

    const initializeResponses = async () => {
        const temp = await GetResponses.initializeResponses(patient.id.toString());
        temp.sort((a: { id: number; },b: { id: number; }) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        setResponses(temp);
        
    }

    const initializeQuestions = async () => {
        const tempQuestions = await GetQuestions.initializeQuestionsBySection("AboutYou");
        tempQuestions.sort((a: {id: number},b: {id: number}) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)

        setQuestions(tempQuestions); 
    }

    async function initializeData() {
        //initializes the questions
        await initializeQuestions();
            // set data as loaded
            //initializes the response
        await initializeResponses();
        
    
        setDataLoaded(true); 
        return dataLoaded;
        
    };
    if(!dataLoaded){
        initializeData();
    }

    const onBlurEvent = (value: string, question : Number) => {
        console.log(value)
        
        var change = { questionId: question, response: value} as SendResponse
        // var traits : SendResponse[] = []
        
        UploadResponseService.setFormDirty(change, value)
    }

    const findResponse = (question: Question) : string =>{
        let response = responses?.find((x) => x.questionID === question.id)?.response;
        let responseObj : Response;
        if(response !== undefined){
            if (question.questionType === "checkbox"){
                responseObj = {questionID: question.id, response: response, patientID: patient.id, id: Number(String(patient.id) + String(question.id))} as Response;
                personalityResponses.push(responseObj);
            }
            return response;
        }
        else if(question.questionType === "select")
        {
            responseObj = {questionID: question.id, response: "none", patientID: patient.id, id: Number(String(patient.id) + String(question.id))} as Response;
            responses?.push(responseObj);
            return "none";
        }else if (question.questionType === "checkbox")
        {
            responseObj = {questionID: question.id, response: "0", patientID: patient.id, id: Number(String(patient.id) + String(question.id))} as Response;
            responses?.push(responseObj);
            personalityResponses.push(responseObj);
            return "0";
        }
        responseObj = {questionID: question.id, response: "", patientID: patient.id, id: Number(String(patient.id) + String(question.id))} as Response;
        responses?.push(responseObj);
        return "";
    }

    const getSelect = (question: Question, response: string) =>{
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label data-testid="selectPrompt">
                    {question.prompt}
                </label>
                <Select data-testid="selectResponse" id={question.id.toString()} className={question.questionType} defaultValue={ response } disabled={!allowInput}  onChange={(event) => onBlurEvent(event.target.value, question.id)}>
                    <MenuItem value="none" disabled hidden>Select an Option</MenuItem>
                    {question.selectOptions?.map(element => { return <MenuItem data-testid="selectOption" value={element}>{element}</MenuItem> })}
                </Select>
            </div>
        )
    }

    const getSingleLine = (question: Question, response: string) => {
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label data-testid="singleLinePrompt">
                    {question.prompt}
                </label>
                <TextField data-testid="singleLineResponse" id={question.id.toString() + "_resp"} defaultValue={ response } disabled={!allowInput} className={question.questionType}  onBlur={(event) => onBlurEvent(event.target.value, question.id)} variant="outlined"/>
            </div>
        )
    }

    const getMultiLine = (question: Question, response: string) => {
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label data-testid="multiLinePrompt">
                    {question.prompt}
                </label>
                <TextField data-testid="multiLineResponse"id={question.id.toString() + "_resp"} defaultValue={ response } disabled={!allowInput}  className={question.questionType}  variant="outlined" onBlur={(event) => onBlurEvent(event.target.value, question.id)} rows={4} multiline/>
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
    window.addEventListener("beforeunload", () =>{
        UploadResponseService.checkFormDirty(patient.id);
    });
    if(!dataLoaded) {
        return (
            <div data-testid="loading-screen">
                <img id="spinner" src={spinner} alt="loading..."/>
            </div>
        )
    }else{
        return (
            <div>
                <div  id="aboutYou">
                    <form className="AboutYou" data-testid="testAboutYou">
                        {questions?.map((element: Question) =>{
                            return makeQuestionComponent(element)
                        })}
                        <PersonalityTraits traits={personalityTraits} responses={personalityResponses}></PersonalityTraits>
                    </form>
                </div>
            </div>
        )
    }
}
export default AboutYou;