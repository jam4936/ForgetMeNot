import React from "react";
import './AddQuestion.css';
import {Modal} from 'react-bootstrap';
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import Question from "../../../Models/Question";
import PutQuestions from "../../../Services/PutQuestions";

class AddQuestion extends React.Component <any, any>{
    constructor(props: any){
        super(props)
        this.state={
            show:false,
            showErrorLabel:false,
            showAddLabel:false,
            typeIsSelect:false,
        }
        this.errorMessage = "";
        this.addMessage = "";
        this.questions = this.props.questions as Question[];
    }
    private errorMessage: string = "";
    private addMessage: string = "";

    private questions: Question[] = this.props.questions as Question[];

    handleModal(){
        this.setState({show:!this.state.show})
    }

    private confirmAdd: boolean = false;
    private timeToRefresh: boolean = false;
    private alreadyAdded: boolean = false;
    async handleAdd(){
        this.doubleClose = false;
        if (this.confirmAdd && !this.alreadyAdded){
            await PutQuestions.addQuestion(this.changedId, this.changedType, this.changedPrompt, this.changedSection, this.changedSelectOptions);
            this.confirmAdd = false;
            this.alreadyAdded = true;
            this.addMessage = "Question added!"
            this.setState({showAddLabel: true, showErrorLabel: false})
            this.timeToRefresh = true;
        }else if(!this.alreadyAdded){
            if (this.idChosen && this.sectionChosen && this.typeChosen && this.promptChosen) {
                this.setState({showAddLabel: true, showErrorLabel: false})
                this.errorMessage = "";
                this.addMessage = "Confirm addition of this question?";
                this.confirmAdd = true;
            } else {
                this.setState({showAddLabel: false, showErrorLabel: true})
                this.errorMessage = "Some fields are invalid!";
                this.addMessage = "";
                this.confirmAdd = false;
                this.doubleClose = false;
            }
        }
    }

    private doubleClose: boolean = false;
    handleClose(){
        this.confirmAdd = false;
        if (!this.doubleClose){
            this.addMessage = "";
            this.setState({showErrorLabel: true, showAddLabel: false})
            this.errorMessage = "Confirm close?";
            this.doubleClose = true;
        }else if (this.doubleClose) {
            this.setState({show:!this.state.show,
                showErrorLabel: false,
                showAddLabel: false
            })
            this.errorMessage = "";
            this.doubleClose = false;
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

    generateId(){
        let genID = 0;
        while(this.questionIdExists(genID)){
            genID++;
        }
        return genID;
    }

    private changedId: number = this.generateId();
    private idChosen: boolean = true;
    handleIdChange(){
        let tempId = (document.getElementById("question-id") as HTMLInputElement).valueAsNumber;
        if ( this.questionIdExists(tempId) ){
            this.setState({showErrorLabel:true})
            this.errorMessage = "This ID already exists!";
            this.idChosen = false;
        }else{
            this.setState({showErrorLabel:false})
            this.errorMessage = "";
            this.changedId = tempId;
            this.idChosen = true;
        }
    }

    private changedSection: string = "";
    private sectionChosen: boolean = false;
    handleSectionChange(event: SelectChangeEvent){
        this.changedSection = event.target.value as string;
        this.sectionChosen = true;
    }

    private changedPrompt: string = "";
    private promptChosen: boolean = false;
    handlePromptChange(){
        this.changedPrompt = (document.getElementById("question-prompt") as HTMLInputElement).value as string;
        this.promptChosen = true;
    }

    private changedType: string = "";
    private typeChosen: boolean = false;
    handleTypeChange(event: SelectChangeEvent){
        this.changedType = event.target.value as string;
        this.typeChosen = true;
        if (this.changedType == "select"){
            this.setState({
                typeIsSelect: true
            });
        }else{
            this.setState({
                typeIsSelect: false
            });
        }
    }

    private changedSelectOptions: string[] = [''];
    private selectedOptionsChosen: boolean = false;
    handleSelectOptionsChange() {
        let tempSelectOptions = ((document.getElementById("select-options") as HTMLInputElement).value as string).split(",");
        if (tempSelectOptions != undefined) {
            this.changedSelectOptions = tempSelectOptions;
            this.selectedOptionsChosen = true;
        }
    }

    render() {
        return (
            <div id={this.changedId.toString()} className={"questionAddButtons"}>
                <button type="button" className="addButton" onClick={()=>this.handleModal()}>Add Question</button>

                <Modal show={this.state.show} onHide={()=>this.handleClose()}>
                    <Modal.Header>Add Question</Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="question-id" className="col-form-label">Choose the ID:</label>
                                <TextField className="form-control" id="question-id" disabled={this.alreadyAdded} type="number" InputProps={{inputProps: {min:0}}} defaultValue={this.generateId()} onChange={this.handleIdChange.bind(this)}></TextField>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question-section" className="col-form-label">Choose the question section:</label>
                                <Select id="question-section" className="select" disabled={this.alreadyAdded} defaultValue={"none"} onChange={this.handleSectionChange.bind(this)} autoWidth={true}>
                                    <MenuItem value="none" disabled hidden>Choose a Section</MenuItem>
                                    <MenuItem value="AboutYou">AboutYou</MenuItem>
                                    <MenuItem value="AboutYourLife">AboutYourLife</MenuItem>
                                    <MenuItem value="DailySchedule">DailySchedule</MenuItem>
                                    <MenuItem value="Interests">Interests</MenuItem>
                                </Select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question-prompt" className="col-form-label">Choose the question prompt:</label>
                                <TextField className="multiLine" id="question-prompt" disabled={this.alreadyAdded} defaultValue={""} onChange={this.handlePromptChange.bind(this)} rows={4} multiline></TextField>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question-type" className="col-form-label">Choose the question type:</label>
                                <Select id="question-type" className="select" disabled={this.alreadyAdded} defaultValue={"none"} onChange={this.handleTypeChange.bind(this)} autoWidth={true}>
                                    <MenuItem value="none" disabled hidden>Choose a Question Type</MenuItem>
                                    <MenuItem value="checkbox">CheckBox</MenuItem>
                                    <MenuItem value="multiLine">MultiLine</MenuItem>
                                    <MenuItem value="select">Select</MenuItem>
                                    <MenuItem value="singleLine">SingleLine</MenuItem>
                                </Select>
                            </div>
                            { this.state.typeIsSelect ?
                                <div className="form-group">
                                    <label htmlFor="question-prompt" className="col-form-label">Enter the Select Menu Items as Comma Separated Values in a List:</label>
                                    <TextField className="multiLine" id="select-options" disabled={this.alreadyAdded} defaultValue={""} onChange={this.handleSelectOptionsChange.bind(this)} rows={4} multiline></TextField>
                                </div> : <div></div>
                            }
                            <div className="form-group">
                                {this.state.showErrorLabel ? <label className="errorMessage">{this.errorMessage}</label>: <div></div>}
                                {this.state.showAddLabel ? <label className="addMessage">{this.addMessage}</label>: <div></div>}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleClose()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleAdd()}>Add</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default AddQuestion;