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
            showCloseLabel:false,
            showYesLabel:false
        }
        this.closeMessage = "";
        this.yesMessage = "";
        this.question = this.props.question as Question;
    }

    private closeMessage: string = "";
    private yesMessage: string = "";
    private question: Question = this.props.question;

    handleModal(){
        this.setState({show:!this.state.show})
    }

    private confirmDelete: boolean = false;
    private timeToRefresh: boolean = false;
    private alreadyDeleted: boolean = false;
    async handleYes(){
        this.doubleClose = false;
        if (this.confirmDelete && !this.alreadyDeleted){
            await DeleteQuestions.deleteQuestionById(this.question.id);
            let responses = await GetResponses.getResponsesByQuestionId(this.question.id);
            for(const response of responses){
                await DeleteResponses.deleteResponseById(response.id);
            }
            this.confirmDelete = false;
            this.alreadyDeleted = true;
            this.yesMessage = "Question deleted!"
            this.setState({showYesLabel: true, showCloseLabel: false})
            this.timeToRefresh = true;
        }else if (!this.confirmDelete && !this.alreadyDeleted){
            this.setState({showYesLabel: true, showCloseLabel: false})
            this.closeMessage = "";
            this.yesMessage = "Confirm deletion of this question?";
            this.confirmDelete = true;
        }
    }

    private doubleClose: boolean = false;
    handleClose(){
        this.confirmDelete = false;
        if (!this.doubleClose){
            this.yesMessage = "";
            this.setState({showCloseLabel: true, showYesLabel: false})
            this.closeMessage = "Confirm close?";
            this.doubleClose = true;
        }else if (this.doubleClose) {
            this.setState({show:!this.state.show,
                showCloseLabel: false,
                showYesLabel: false
            })
            this.closeMessage = "";
            this.doubleClose = false;
            if (this.timeToRefresh){
                this.timeToRefresh = false;
                window.location.reload();
            }
        }
    }

    render() {
        return (
            <div id={this.question.id.toString()} className={"questionButtons"}>
                <button type="button" className="deleteButton" onClick={()=>this.handleModal()}>Delete Question</button>
                <Modal show={this.state.show} onHide={()=>this.handleClose()}>
                    <Modal.Header >Delete Question</Modal.Header>
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
                            <div className="form-group">
                                {this.state.showCloseLabel ? <label className="closeMessage">{this.closeMessage}</label>: <div></div>}
                                {this.state.showYesLabel ? <label className="yesMessage">{this.yesMessage}</label>: <div></div>}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleClose()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleYes()}>Yes</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DeleteQuestion;