import React from "react";
import './Thumbnail.css';
import Modal from 'react-bootstrap/Modal';
import DeleteMedia from "../../../Services/DeleteMedia";

class Thumbnail extends React.Component <any, any>{
    constructor(props: any){
        super(props)
        this.state={
            showImageDetails:false,
            showDeleteConfirm:false
        }
    }

    handleImageDetailsModal(){
        this.setState({showImageDetails:!this.state.showImageDetails})
    }

    handleDeleteModal(){
        this.setState({showDeleteConfirm:!this.state.showDeleteConfirm})
    }

    async deleteMedia(){
        await DeleteMedia.deleteMediaById(this.props.image.id);
        this.handleDeleteModal()
    }

    render() {
        return (
            <div key={this.props.image.url} className="thumbnail">
                <button id="buttonOverlay" onClick={()=>this.handleImageDetailsModal()} >
                    <img src={this.props.image.url} height="200" alt="upload" />
                </button>
                <button type="button" className="btn btn-circle btn-sm" id="delete" onClick={() => this.handleDeleteModal()}>X</button>

                <Modal show={this.state.showDeleteConfirm} onHide={()=>this.handleDeleteModal()}>
                    <Modal.Header>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleDeleteModal()}>Back</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.deleteMedia()}>Delete</button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showImageDetails} onHide={()=>this.handleImageDetailsModal()}>
                    <Modal.Header>
                        <Modal.Title>Edit Description</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.props.image.url} height="200" alt="upload" id="image" />
                        <form>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Is there anyone significant in this photo?</label>
                                <textarea className="form-control" id="message-text"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Does this photograph a significant event?</label>
                                <textarea className="form-control" id="message-text"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Is there anything else we should know regarding this photo?</label>
                                <textarea className="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleImageDetailsModal()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleImageDetailsModal()}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Thumbnail;