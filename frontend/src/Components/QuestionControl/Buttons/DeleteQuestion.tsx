import React from "react";
import './DeleteQuestion.css';
import {Modal} from 'react-bootstrap';
import Question from "../../../Models/Question";
import DeleteQuestions from "../../../Services/DeleteQuestions";
import GetResponses from "../../../Services/GetResponses";
import DeleteResponses from "../../../Services/DeleteResponses";
import {redirectAdmin} from "../../../Services/getRole";

class DeleteQuestion extends React.Component <any, any>{
    constructor(props: {} | Readonly<{}>){
        redirectAdmin()
        super(props)
        this.state={
            show:false,
        }
        this.question = this.props.question as Question;
    }

    private question: Question = this.props.question;

    handleModal(){
        this.setState({show:!this.state.show})
    }

    async handleYes(){
        await DeleteQuestions.deleteQuestionById(this.question.id);
        let responses = await GetResponses.getResponsesByQuestionId(this.question.id);
        for(const response of responses){
            await DeleteResponses.deleteResponseById(response.id);
        }
        this.setState({show:!this.state.show})
        window.location.reload();
    }

    handleClose(){
        this.setState({show:!this.state.show})
    }

    render() {
        return (
            <div id={this.question.id.toString()} className={"questionButtons"}>
                <button type="button" className="deleteButton" onClick={()=>this.handleModal()}>Delete Question</button>
                <Modal show={this.state.show} onHide={()=>this.handleClose()}>
                    <Modal.Header >Delete Question?</Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <div id={this.question.id.toString()} className={"questionContents"}>
                                    <div id={this.question.id.toString()} className={"questionLabel"}>
                                        <label>ID:</label>
                                        <label className="spanLabel">
                                            {this.question.id}
                                        </label>
                                    </div>
                                    <div id={this.question.id.toString()} className={"questionLabel"}>
                                        <label>Question Prompt:</label>
                                        <label className="spanLabel">
                                            {this.question.prompt}
                                        </label>
                                    </div>
                                    <div id={this.question.id.toString()} className={"questionLabel"}>
                                        <label>Question Section:</label>
                                        <label className="spanLabel">
                                            {this.question.sectionType}
                                        </label>
                                    </div>
                                    <div id={this.question.id.toString()} className={"questionLabel"}>
                                        <label>Question Type:</label>
                                        <label className="spanLabel">
                                            {this.question.questionType}
                                        </label>
                                    </div>
                                    { this.question.questionType == "select" ?
                                        <div id={this.question.id.toString()} className={"questionLabel"}>
                                            <label>Select Options:</label>
                                            <label className="spanLabel">
                                                {(this.question.selectOptions as string[]).toString()}
                                            </label>
                                        </div> : <div></div>
                                    }
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleClose()}>No</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleYes()}>Yes</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DeleteQuestion;