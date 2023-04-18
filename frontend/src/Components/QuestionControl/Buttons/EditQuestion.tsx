import React from "react";
import './EditQuestion.css';
import {Modal} from 'react-bootstrap';
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import Question from "../../../Models/Question";
import PutQuestions from "../../../Services/PutQuestions";
import {redirectAdmin} from "../../../Services/getRole";

class EditQuestion extends React.Component <any, any>{
    constructor(props: any){
        redirectAdmin()
        super(props)
        this.state={
            show:false,
            typeIsSelect:(this.props.question.questionType == "select"),
        }
        this.unsavedChanges = false;
        this.question = this.props.question as Question;
        this.questions = this.props.questions as Question[];
        this.selectOptionsToString();
    }
    private unsavedChanges: boolean = false;
    private question: Question = this.props.question;

    private questions: Question[];

    handleModal(){
        this.setState({show:!this.state.show})
    }

    async handleSave(){
        if (this.unsavedChanges) {
            this.question.prompt = this.changedPrompt;
            this.question.sectionType = this.changedSection;
            if (this.state.typeIsSelect) {
                this.question.selectOptions = this.changedSelectOptions;
            }
            await PutQuestions.uploadQuestion(this.question);
            this.setState({
                show: !this.state.show
            })
            this.unsavedChanges = false;
            window.location.reload();
        }
    }

    handleClose(){
        this.setState({show:!this.state.show,
            showErrorLabel: false,
        })
        this.unsavedChanges = false;
    }

    private changedSection: string = this.question.sectionType;
    handleSectionChange(event: SelectChangeEvent){
        let tempSection = event.target.value as string;
        this.unsavedChanges = (tempSection != this.question.sectionType);
        this.changedSection = tempSection;
    }

    private changedPrompt: string = this.question.prompt;
    handlePromptChange(){
        let tempPrompt = (document.getElementById("question-prompt") as HTMLInputElement).value as string;
        this.unsavedChanges = (tempPrompt != this.question.prompt);
        this.changedPrompt = tempPrompt;
    }

    private changedSelectOptions: string[] = (this.question.selectOptions == undefined ? [''] : this.question.selectOptions as string[]);
    handleSelectOptionsChange() {
        let tempSelectOptions = ((document.getElementById("select-options") as HTMLInputElement).value as string).split(",");
        if (tempSelectOptions != undefined) {
            this.unsavedChanges = !(this.compareSelectOptions(tempSelectOptions, (this.question.selectOptions == undefined ? [''] : this.question.selectOptions as string[])));
            this.changedSelectOptions = tempSelectOptions;
        }
    }

    compareSelectOptions(compare1: string[], compare2: string[]){
        if (compare1.length == compare2.length) {
            let sameList = true;
            for (let index = 0; index < compare1.length; index++){
                if (compare1.at(index) != compare2.at(index)){
                    sameList = false;
                }
            }
            return sameList;
        }else{
            return false;
        }
    }

    private selectOptionsAsString: string = "";
    selectOptionsToString(){
        if (this.question.questionType == "select"){
            this.selectOptionsAsString = (this.question.selectOptions as string[]).toString()
        }else{
            this.selectOptionsAsString = "";
        }
    }

    render() {
        return (
            <div id={this.question.id.toString()} className={"questionButtons"}>
                <button type="button" className="editButton" onClick={()=>this.handleModal()}>Edit Question</button>

                <Modal show={this.state.show} onHide={()=>this.handleClose()}>
                    <Modal.Header>Edit Question</Modal.Header>
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
                                        <label>Question Type:</label>
                                        <label className="spanLabel">
                                            {this.question.questionType}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question-section" className="col-form-label">Change the question section?</label>
                                <Select id="question-section" className="select" defaultValue={this.question.sectionType as string} onChange={this.handleSectionChange.bind(this)} autoWidth={true}>
                                    <MenuItem value="AboutYou">AboutYou</MenuItem>
                                    <MenuItem value="AboutYourLife">AboutYourLife</MenuItem>
                                    <MenuItem value="DailySchedule">DailySchedule</MenuItem>
                                    <MenuItem value="Interests">Interests</MenuItem>
                                </Select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question-prompt" className="col-form-label">Change the question prompt?</label>
                                <TextField className="multiLine" id="question-prompt" defaultValue={this.question.prompt} onChange={this.handlePromptChange.bind(this)} rows={4} multiline></TextField>
                            </div>
                            { this.state.typeIsSelect ?
                                <div className="form-group">
                                    <label htmlFor="question-prompt" className="col-form-label">Enter the Select Menu Items as Comma Separated Values in a List:</label>
                                    <TextField className="multiLine" id="select-options" defaultValue={this.selectOptionsAsString} onChange={this.handleSelectOptionsChange.bind(this)} rows={4} multiline></TextField>
                                </div> : <div></div>
                            }
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleClose()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleSave()}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EditQuestion;