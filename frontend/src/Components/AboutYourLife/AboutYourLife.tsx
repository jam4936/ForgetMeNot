
import { useState } from "react";
import './AboutYourLife.css';
import Question from "../../Models/Question";
import { Dialog, MenuItem, Select, TextField } from "@mui/material";
import SendResponse from "../../Models/SendResponse";
import UploadResponseService from "../../Services/UploadResponseService";
import GetQuestions from "../../Services/GetQuestions";
import Response from "../../Models/Response";
import GetResponses from "../../Services/GetResponses";
import Patient from "../../Models/Patient";
import spinner from "../../Assets/loadingspinner.gif";
import { Puff } from "react-loader-spinner";

function AboutYourLife(props: any){
    const patient = props.patient;
    const allowInput = props.allowInput;
    const [questions, setQuestions] = useState([] as Question[]);
    const [responses, setResponses] = useState([] as Response[]);

    const initializeResponses = async () => {
       const tempResponses = await GetResponses.initializeResponses(patient.id.toString());
       tempResponses.sort(((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
        setResponses(tempResponses);

    }

    const initializeQuestions = async () => {
        const tempQuestions = await GetQuestions.initializeQuestionsBySection("AboutYourLife");
        tempQuestions.sort((a: {id: number},b: {id: number}) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)

        setQuestions(tempQuestions); 

    }

    // only call database once
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const initializeData = async () => {
        if (!dataLoaded) {
            //initializes the questions
            await initializeQuestions();
            //initializes the response
            await initializeResponses();
            //prevent a second call
            await setDataLoaded(true);
        }
    }

    initializeData()

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
                <Select id={question.id.toString()} className={question.questionType} disabled={!allowInput} defaultValue={ findResponse(question) } onChange={(event) => onBlurEvent(event.target.value, question.id)}>
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
                <TextField id={question.id.toString() + "_resp"} disabled={!allowInput} defaultValue={ findResponse(question) } className={question.questionType}  onBlur={(event) => onBlurEvent(event.target.value, question.id)} variant="outlined"/>
            </div>
        )
    }

    const getMultiLine = (question: Question) => {
        return(
            <div id={question.id.toString()} className={question.questionType}>
                <label>
                    {question.prompt}
                </label>
                <TextField id={question.id.toString() + "_resp"} disabled={!allowInput} defaultValue={ findResponse(question) } className={question.questionType}  variant="outlined" onBlur={(event) => onBlurEvent(event.target.value, question.id)} rows={4} multiline/>
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

    window.addEventListener("beforeunload", (event) =>{
        UploadResponseService.checkFormDirty(patient.id);
    });
    if(dataLoaded){
        return (
            <div>
                <div id="aboutYourLife">
                    <form data-testid="aboutyourlife" className="AboutYourLife">
                        {questions?.map((element: Question) => {
                            return makeQuestionComponent(element)
                        })}
                    </form>
                </div>
            </div>
        )
    }else {
        return (
            <div>
                <Dialog disableScrollLock={true} open={!dataLoaded} id="loadingScreenDialog">
                    <Puff   height="80"
                            width="80"
                            radius={1}
                            color="#EFF1FB" visible={!dataLoaded} />
                </Dialog>
            </div>
        )
    }
}
export default AboutYourLife;