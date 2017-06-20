import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import './Modal.scss';

class ModalWindow extends Component {

    static propTypes = {
        modalBody: PropTypes.string.isRequired,
        modalTitle: PropTypes.string.isRequired,
        isModalOpen: PropTypes.bool.isRequired,
        enableButtons: PropTypes.bool.isRequired,
        closeFunction: PropTypes.func,
        confirmFunction: PropTypes.func
    };

    __getButtons(closeFunction, confirmFunction) {
        if (this.props.enableButtons) {
            return (
                <Modal.Footer>
                    <Button onClick={closeFunction}>Close</Button>
                    <Button onClick={confirmFunction} bsStyle="success">Confirm</Button>
                </Modal.Footer>
            )
        }
    }

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
                {this.__getButtons(this.props.closeFunction, this.props.confirmFunction )}
            </Modal>
        )
    }
}

export default ModalWindow;