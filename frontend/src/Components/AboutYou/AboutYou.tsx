
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

import {redirectLoggedIn} from "../../Services/getRole";

import spinner from "../../Assets/loadingspinner.gif"
import {Puff} from 'react-loader-spinner';
import {Dialog} from "@mui/material";
function AboutYou(props: any) {
    //Determines if user is allowed to access page
    redirectLoggedIn()

    /* *************Function Variables************* */
    const patient = props.patient;
    const allowInput = props.allowInput;
    var personalityTraits : Question[] = [];
    var personalityResponses : Response[] = [];
    /* *************Function States************* */
    const [questions, setQuestions] = useState([] as Question[]);
    const [responses, setResponses] = useState([] as Response[]);
    const [dataLoaded, setDataLoaded] = useState(false);


    /*
     * Retrieves responses to questions based on patient id
     * Sorts responses based on ID number
     */
    const initializeResponses = async () => {
        const temp = await GetResponses.initializeResponses(patient.id.toString());
        temp.sort((a: { id: number; },b: { id: number; }) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        setResponses(temp);
    }

    /* 
     * Retrieves questions based on section
     */
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

    // Checks if the data is loaded and if not calls initializeData
    if(!dataLoaded){
        initializeData();
    }

    // When a field is blurred (no longer in focus) it records the response change and sends to Upload Response Service
    const onBlurEvent = (value: string, question : Number) => {
        var change = { questionId: question, response: value} as SendResponse        
        UploadResponseService.setFormDirty(change, value)
    }

    /*
     * Matches the response to the question based on the response questionId field matching to the question id field
     */
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

    //Creates the select box components
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

    //Creates the textfield components with a line max of 1
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

    //Creates the textfield components with a line max of 4
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

    //Creates the question component based on the question type
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
    //Sends the changed questions for a given patient when the accordion dropdown is closed
    window.addEventListener("beforeunload", () =>{
        UploadResponseService.checkFormDirty(patient.id);
    });

    //When the data is still loading displays spinner
    if(!dataLoaded) {
        return (
            <div data-testid="loading-screen">
                <Dialog disableScrollLock={true} open={!dataLoaded} id="loadingScreenDialog">
                    <Puff   height="80"
                            width="80"
                            radius={1}
                            color="#EFF1FB" visible={!dataLoaded} />
                </Dialog>
            </div>
        )
    }else{
        return (
            <div>
                <div hidden={!dataLoaded}>
                    <div  id="aboutYou">
                        <form className="AboutYou" data-testid="testAboutYou">
                            {questions?.map((element: Question) =>{
                                return makeQuestionComponent(element)
                            })}
                            <PersonalityTraits traits={personalityTraits} responses={personalityResponses}></PersonalityTraits>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
export default AboutYou;