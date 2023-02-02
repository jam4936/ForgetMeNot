import React from "react";
import './EditQuestion.css';
import {Modal} from 'react-bootstrap';
import Question from "../../../Models/Question";
import { MenuItem, Select, TextField } from "@mui/material";

class EditQuestion extends React.Component <any, any>{
    constructor(props: {} | Readonly<{}>){
        super(props)
        this.state={
            show:false,
            showErrorLabel:false,
            errorMessage:""
        }
    }


    handleModal(){
        this.setState({show:!this.state.show})
    }

    handleClose(){
        if (!this.state.showErrorLabel) {
            this.setState({
                errorMessage: "You have unsaved changes!",
                showErrorLabel: true
            })
        }else {
            this.setState({show:!this.state.show,
                                errorMessage: "",
                                showErrorLabel: false})
        }
    }

    handleSave(){
        //this.setState({show:!this.state.show})
    }

    render() {
        return (
            <div id={this.props.question.id.toString()} className={"questionButtons"}>
                <button type="button" className="editButton" onClick={()=>this.handleModal()}>Edit Question</button>

                <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                    <Modal.Header closeButton>Edit Question</Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="question-id" className="col-form-label">Change the ID?</label>
                                <TextField className="form-control" id="message-text" type="number" defaultValue={this.props.question.id}></TextField>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question-type" className="col-form-label">Change the question prompt?</label>
                                <Select id={"select-question-type"} className="select" defaultValue={this.props.question.questionType}>
                                    <MenuItem value="checkbox">CheckBox</MenuItem>
                                    <MenuItem value="multiLine">MultiLine</MenuItem>
                                    <MenuItem value="select">Select</MenuItem>
                                    <MenuItem value="singleLine">SingleLine</MenuItem>
                                </Select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question-prompt" className="col-form-label">Change the question prompt?</label>
                                <TextField className="multiLine" id="message-text" defaultValue={this.props.question.prompt} rows={4} multiline></TextField>
                            </div>
                            <div className="form-group">
                                {this.state.showErrorLabel ? <label className="errorMessage">{this.state.errorMessage}</label>: <div></div>}
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