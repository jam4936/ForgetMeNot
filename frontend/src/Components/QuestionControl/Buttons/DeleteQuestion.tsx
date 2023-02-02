import React from "react";
import './DeleteQuestion.css';
import {Modal} from 'react-bootstrap';
import {MenuItem, Select, TextField} from "@mui/material";

class DeleteQuestion extends React.Component <any, any>{
    constructor(props: {} | Readonly<{}>){
        super(props)
        this.state={
            show:false
        }
    }

    handleModal(){
        this.setState({show:!this.state.show})
    }

    handleNo(){
        this.setState({show:!this.state.show})
    }

    handleYes(){
        //this.setState({show:!this.state.show})
    }

    render() {
        return (
            <div id={this.props.question.id.toString()} className={"questionButtons"}>
                <button type="button" className="deleteButton" onClick={()=>this.handleModal()}>Delete Question</button>

                <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                    <Modal.Header closeButton>Delete Question</Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="delete-question" className="col-form-label">Are you sure you want to delete this question?</label>
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