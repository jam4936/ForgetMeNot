import React from "react";
import './EditQuestion.css';
import {Modal} from 'react-bootstrap';
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import Question from "../../../Models/Question";
import PutQuestions from "../../../Services/PutQuestions";

class EditQuestion extends React.Component <any, any>{
    constructor(props: any){
        super(props)
        this.state={
            show:false,
            showErrorLabel:false,
            showSaveLabel:false,
            typeIsSelect:(this.props.question.questionType == "select"),
        }
        this.errorMessage = "";
        this.saveMessage = "";
        this.unsavedChanges = false;
        this.question = this.props.question as Question;
        this.questions = this.props.questions as Question[];
        this.selectOptionsToString();
    }
    private errorMessage: string = "";
    private saveMessage: string = "";
    private unsavedChanges: boolean = false;
    private question: Question = this.props.question;

    private questions: Question[];

    handleModal(){
        this.setState({show:!this.state.show})
    }

    private overwriteSave: boolean = false;
    private timeToRefresh: boolean = false;
    async handleSave(){
        this.doubleClose = false;
        this.ignoreSave = false;
        if (this.overwriteSave){
            this.question.id = this.changedId;
            this.question.questionType = this.changedType;
            this.question.prompt = this.changedPrompt;
            this.question.sectionType = this.changedSection;
            this.question.selectOptions = this.changedSelectOptions
            await PutQuestions.uploadQuestion(this.question);
            this.overwriteSave = false;
            this.saveMessage = "Question saved!"
            this.setState({showSaveLabel: true, showErrorLabel: false})
            this.unsavedChanges = false;
            this.timeToRefresh = true;
        }
        if (this.unsavedChanges){
            this.setState({showSaveLabel: true, showErrorLabel: false})
            this.errorMessage = "";
            this.saveMessage = "Confirm overwrite of this question?";
            this.overwriteSave = true;
        }
    }

    private doubleClose: boolean = false;
    private ignoreSave: boolean = false;
    handleClose(){
        this.overwriteSave = false;
        if (this.unsavedChanges && !this.ignoreSave) {
            this.saveMessage = "";
            this.setState({showErrorLabel: true, showSaveLabel: false})
            this.errorMessage = "You have unsaved changes!";
            this.ignoreSave = true;
        }else if (!this.doubleClose && this.ignoreSave){
            this.setState({showErrorLabel: true})
            this.errorMessage = "Confirm close?";
            this.doubleClose = true;
        }else if (!this.doubleClose){
            this.saveMessage = "";
            this.setState({showErrorLabel: true, showSaveLabel: false})
            this.errorMessage = "Confirm close?";
            this.doubleClose = true;
        }else if (this.doubleClose || this.ignoreSave) {
            this.setState({show:!this.state.show,
                showErrorLabel: false,
            })
            this.unsavedChanges = false;
            this.errorMessage = "";
            this.doubleClose = false;
            this.ignoreSave = false;
            if (this.timeToRefresh){
                this.timeToRefresh = false;
                window.location.reload();
            }
        }
    }

    questionIdExists(checkId: number){
        let idExists = false;
        this.questions.forEach((question: Question) => {
            if(checkId == question.id){
                idExists = true;
            }
        })
        return idExists;
    }

    private changedId: number = this.question.id;
    handleIdChange(){
        let tempId = (document.getElementById("question-id") as HTMLInputElement).valueAsNumber;
        if ( (tempId != this.question.id) && (this.questionIdExists(tempId))){
            this.setState({showErrorLabel:true})
            this.errorMessage = "This ID already exists!";
        }else{
            this.setState({showErrorLabel:false})
            this.errorMessage = "";
            this.unsavedChanges = (tempId != this.question.id);
            this.changedId = tempId;
            if (this.unsavedChanges){
                this.doubleClose = false;
                this.ignoreSave = false;
            }
        }
    }

    private changedSection: string = this.question.sectionType;
    handleSectionChange(event: SelectChangeEvent){
        let tempSection = event.target.value as string;
        this.unsavedChanges = (tempSection != this.question.sectionType);
        this.changedSection = tempSection;
        if (this.unsavedChanges){
            this.doubleClose = false;
            this.ignoreSave = false;
        }
    }

    private changedPrompt: string = this.question.prompt;
    handlePromptChange(){
        let tempPrompt = (document.getElementById("question-prompt") as HTMLInputElement).value as string;
        this.unsavedChanges = (tempPrompt != this.question.prompt);
        this.changedPrompt = tempPrompt;
        if (this.unsavedChanges){
            this.doubleClose = false;
            this.ignoreSave = false;
        }
    }

    private changedType: string = this.question.questionType;
    handleTypeChange(event: SelectChangeEvent){
        let tempType = event.target.value as string;
        this.unsavedChanges = (tempType != this.question.questionType);
        this.changedType = tempType;
        if (this.changedType == "select"){
            this.setState({
                typeIsSelect: true
            });
        }else{
            this.setState({
                typeIsSelect: false
            });
        }
        if (this.unsavedChanges){
            this.doubleClose = false;
            this.ignoreSave = false;
        }
    }

    private changedSelectOptions: string[] = (this.question.selectOptions == undefined ? [''] : this.question.selectOptions as string[]);
    handleSelectOptionsChange() {
        let tempSelectOptions = ((document.getElementById("select-options") as HTMLInputElement).value as string).split(",");
        if (tempSelectOptions != undefined) {
            this.unsavedChanges = !(this.compareSelectOptions(tempSelectOptions, (this.question.selectOptions == undefined ? [''] : this.question.selectOptions as string[])));
            this.changedSelectOptions = tempSelectOptions;
            if (this.unsavedChanges) {
                this.doubleClose = false;
                this.ignoreSave = false;
            }
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
                                <label htmlFor="question-id" className="col-form-label">Change the ID?</label>
                                <TextField className="form-control" id="question-id" type="number" InputProps={{inputProps: {min:0}}} defaultValue={this.question.id} onChange={this.handleIdChange.bind(this)}></TextField>
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
                            <div className="form-group">
                                <label htmlFor="question-type" className="col-form-label">Change the question type?</label>
                                <Select id="question-type" className="select" defaultValue={this.question.questionType as string} onChange={this.handleTypeChange.bind(this)} autoWidth={true}>
                                    <MenuItem value="checkbox">CheckBox</MenuItem>
                                    <MenuItem value="multiLine">MultiLine</MenuItem>
                                    <MenuItem value="select">Select</MenuItem>
                                    <MenuItem value="singleLine">SingleLine</MenuItem>
                                </Select>
                            </div>
                            { this.state.typeIsSelect ?
                                <div className="form-group">
                                    <label htmlFor="question-prompt" className="col-form-label">Enter the Select Menu Items as Comma Separated Values in a List:</label>
                                    <TextField className="multiLine" id="select-options" defaultValue={this.selectOptionsAsString} onChange={this.handleSelectOptionsChange.bind(this)} rows={4} multiline></TextField>
                                </div> : <div></div>
                            }
                            <div className="form-group">
                                {this.state.showErrorLabel ? <label className="errorMessage">{this.errorMessage}</label>: <div></div>}
                                {this.state.showSaveLabel ? <label className="saveMessage">{this.saveMessage}</label>: <div></div>}
                            </div>
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