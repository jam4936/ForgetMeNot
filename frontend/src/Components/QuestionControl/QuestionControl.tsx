
import GetQuestions from "../../Services/GetQuestions";
import React, {useState} from "react";
import Question from "../../Models/Question";
import './QuestionControl.css'
import spinner from "../../Images/loadingspinner.gif"
import EditQuestion from "./Buttons/EditQuestion";
import DeleteQuestion from "./Buttons/DeleteQuestion";
import {TextField} from "@mui/material";
import AddQuestion from "./Buttons/AddQuestion";

export const QuestionControl = () => {

    const [questions, setQuestions] = useState<Question[]>();

    const initializeQuestions = async () => {
         await GetQuestions.initializeQuestions();
         setQuestions(GetQuestions.questions.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    }

    // only call database once
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const initializeData = async () => {
        //initializes the questions
        await initializeQuestions();
        // set data as loaded
        setDataLoaded(true);
    }

    if(!dataLoaded) initializeData();

    const makeQuestionComponent = (question: Question) =>{
        return (
            <div id={question.id.toString()} className={"questionContainer"}>
                <div id={question.id.toString()} className={"questionContents"}>
                    <div id={question.id.toString()} className={"questionLabel"}>
                        <label>ID:</label>
                        <label className="spanLabel">
                            {question.id}
                        </label>
                    </div>
                    <div id={question.id.toString()} className={"questionLabel"}>
                        <label>Question Prompt:</label>
                        <label className="spanLabel">
                            {question.prompt}
                        </label>
                    </div>
                    <div id={question.id.toString()} className={"questionLabel"}>
                        <label>Question Section:</label>
                        <label className="spanLabel">
                            {question.sectionType}
                        </label>
                    </div>
                    <div id={question.id.toString()} className={"questionLabel"}>
                        <label>Question Type:</label>
                        <label className="spanLabel">
                            {question.questionType}
                        </label>
                    </div>
                    { question.questionType == "select" ?
                        <div id={question.id.toString()} className={"questionLabel"}>
                            <label>Select Options:</label>
                            <label className="spanLabel">
                                {(question.selectOptions as string[]).toString()}
                            </label>
                        </div> : <div></div>
                    }
                </div>
                <div id={question.id.toString()} className={"questionButtons"}>
                    <EditQuestion question={question} questions={questions}></EditQuestion>
                    <DeleteQuestion question={question}></DeleteQuestion>
                </div>
            </div>
        )
    }

    if(!dataLoaded){
        return (
            <div id="questionControl">
                <h1>Manage the Questions:</h1>
                <div>
                    <img id="spinner" src={spinner} alt="loading..." />
                </div>
            </div>
        )
    }else{
        return (
            <div>
                <div id="questionControl">
                    <h1>Manage the Questions:</h1>
                    <AddQuestion questions={questions}></AddQuestion>
                    <form className="questionControl">
                        {questions?.map((element: Question) =>{
                            return makeQuestionComponent(element)
                        })}
                    </form>
                </div>
            </div>
        )
    }
}