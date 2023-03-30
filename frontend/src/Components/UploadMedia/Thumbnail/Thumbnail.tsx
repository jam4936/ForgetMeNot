import React from "react";
import './Thumbnail.css';
import Modal from 'react-bootstrap/Modal';
import DeleteMedia from "../../../Services/DeleteMedia";

class Thumbnail extends React.Component <any, any>{
    constructor(props: any){
        super(props)
        this.state={
            showMediaDetails:false,
            showDeleteConfirm:false
        }
    }

    handleMediaDetailsModal(){
        this.setState({showMediaDetails:!this.state.showMediaDetails})
    }

    handleDeleteModal(){
        this.setState({showDeleteConfirm:!this.state.showDeleteConfirm})
    }

    async deleteMedia(){
        await DeleteMedia.deleteMediaById(this.props.media.id);
        this.handleDeleteModal();
        await this.props.callback(this.props.media.id, this.props.media.isGreeting);
    }

    render() {
        return (
            <div key={this.props.media.url} className="thumbnail">
                <button id="buttonOverlay" onClick={()=>this.handleMediaDetailsModal()} >
                    {this.props.isVideo ? (
                        <video height="200" controls>
                            <source src={this.props.media.url} type="video/mp4" />
                        </video>
                    ) : (
                        <img src={this.props.media.url} height="200" alt="upload" />
                    )}
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

                <Modal show={this.state.showMediaDetails} onHide={()=>this.handleMediaDetailsModal()}>
                    <Modal.Header>
                        <Modal.Title>Edit Description</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="image">
                            {this.props.isVideo ? (
                                <video height="200" controls>
                                    <source src={this.props.media.url} type="video/mp4" />
                                </video>
                            ) : (
                                <img src={this.props.media.url} height="200" alt="upload"/>
                            )}
                        </div>
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
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleMediaDetailsModal()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleMediaDetailsModal()}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Thumbnail;