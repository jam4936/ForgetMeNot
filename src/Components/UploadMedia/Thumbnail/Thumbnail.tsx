import React from "react";
import './Thumbnail.css';
import {Modal} from 'react-bootstrap';

class Thumbnail extends React.Component <any, any>{
    constructor(props: {} | Readonly<{}>){
        super(props)
        this.state={
            show:false
        }
    }

    handleModal(){
        this.setState({show:!this.state.show})
    }

    render() {
        return (
            <div key={this.props.image} className="thumbnail">
                <button id="buttonOverlay" onClick={()=>this.handleModal()} >
                    <img src={this.props.image} height="200" alt="upload" />
                </button>
                <button type="button" className="btn btn-circle btn-sm" id="delete">X</button>

                <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                    <Modal.Header closeButton>Edit Description</Modal.Header>
                    <Modal.Body>
                        <img src={this.props.image} height="200" alt="upload" id="image" />
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
                        <button type="button" className="btn btn-secondary" onClick={()=>this.handleModal()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.handleModal()}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Thumbnail;