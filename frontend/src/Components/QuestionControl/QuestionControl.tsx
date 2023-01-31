
import GetQuestions from "../../Services/GetQuestions";
import React, {useState} from "react";
import Question from "../../Models/Question";
import './QuestionControl.css'
import spinner from "../../Images/loadingspinner.gif"


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
            <div id={question.id.toString()} className={"questionBox"}>
                <div id={question.id.toString()} className={"questionContents"}>
                    <label>Question Prompt:</label>
                    <label className="spanLabel">
                        {question.prompt}
                    </label>
                </div>
                <div id={question.id.toString()} className={"questionContents"}>
                    <label>Question Type:</label>
                    <label className="spanLabel">
                        {question.questionType}
                    </label>
                </div>
                <div id={question.id.toString()} className={"questionContents"}>
                    <label>Question Section:</label>
                    <label className="spanLabel">
                        {question.sectionType}
                    </label>
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
                    <form className="questionControl">
                        {questions?.map((element: Question) =>{
                            return makeQuestionComponent(element)
                        })}
                    </form>
                </div>
            </div>
        )
    }
    //
}