import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import './Modal.scss';

class ModalWindow extends Component {

    static propTypes = {
        modalBody: PropTypes.string.isRequired,
        modalTitle: PropTypes.string.isRequired,
        isModalOpen: PropTypes.bool,
        closeModal: PropTypes.func,
        deletePost: PropTypes.func
    };

    render() {
        return (
            <Modal
                show={this.props.isModalOpen}
                onHide={this.props.closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.modalBody}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeModal}>Close</Button>
                    <Button onClick={this.props.deletePost} bsStyle="success">Confirm</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalWindow;