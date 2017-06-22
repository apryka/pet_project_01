import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import './Modal.scss';

class ModalWindow extends Component {

    static propTypes = {
        modalBody: PropTypes.string.isRequired,
        modalTitle: PropTypes.string.isRequired,
        isModalOpen: PropTypes.bool.isRequired,
        closeFunction: PropTypes.func,
        confirmFunction: PropTypes.func,
        buttons: PropTypes.array.isRequired
    };

    __getButtons(buttons) {

        if (!buttons.length) { return }

        const buttonItems = buttons.map( (button) =>

            <Button key={button.id} onClick={button.action} bsStyle={button.style}>{button.label}</Button>

        );

        return (
            <Modal.Footer>{buttonItems}</Modal.Footer>
        )


    }

    render() {

        return (
            <Modal
                show={this.props.isModalOpen}
                onHide={this.props.closeFunction}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.modalBody}
                </Modal.Body>
                {this.__getButtons(this.props.buttons)}
            </Modal>
        )
    }
}

export default ModalWindow;