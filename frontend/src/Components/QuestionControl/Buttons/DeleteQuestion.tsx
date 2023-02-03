import React from "react";
import './DeleteQuestion.css';
import {Modal} from 'react-bootstrap';
import Question from "../../../Models/Question";
import DeleteQuestions from "../../../Services/DeleteQuestions";

class DeleteQuestion extends React.Component <any, any>{
    constructor(props: {} | Readonly<{}>){
        super(props)
        this.state={
            show:false,
            showNoLabel:false,
            showYesLabel:false
        }
        this.noMessage = "";
        this.yesMessage = "";
        this.question = this.props.question as Question;
    }

    private noMessage: string = "";
    private yesMessage: string = "";
    private question: Question = this.props.question;

    handleModal(){
        this.setState({show:!this.state.show})
    }

    private confirmDelete: boolean = false;
    private timeToRefresh: boolean = false;
    async handleYes(){
        this.doubleClose = false;
        if (this.confirmDelete){
            await DeleteQuestions.deleteQuestionById(this.question.id);
            this.confirmDelete = false;
            this.yesMessage = "Question deleted!"
            this.setState({showYesLabel: true, showNoLabel: false})
            this.timeToRefresh = true;
        }else if (!this.confirmDelete){
            this.setState({showYesLabel: true, showNoLabel: false})
            this.noMessage = "";
            this.yesMessage = "Confirm deletion of this question?";
            this.confirmDelete = true;
        }
    }

    private doubleClose: boolean = false;
    handleNo(){
        this.confirmDelete = false;
        if (!this.doubleClose){
            this.yesMessage = "";
            this.setState({showNoLabel: true, showYesLabel: false})
            this.noMessage = "Confirm no?";
            this.doubleClose = true;
        }else if (this.doubleClose) {
            this.setState({show:!this.state.show,
                showNoLabel: false,
                showYesLabel: false
            })
            this.noMessage = "";
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

                <Modal show={this.state.show} onHide={()=>this.handleNo()}>
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
                                {this.state.showNoLabel ? <label className="noMessage">{this.noMessage}</label>: <div></div>}
                                {this.state.showYesLabel ? <label className="yesMessage">{this.yesMessage}</label>: <div></div>}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleNo()}>No</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleYes()}>Yes</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DeleteQuestion;