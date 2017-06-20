import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid, Col, FormGroup, Radio, FormControl, Button, HelpBlock } from 'react-bootstrap';
import { apiUrl } from '../config';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import './Form.scss';

class Form extends Component {

    static propTypes = {
        users: PropTypes.array,
        comments: PropTypes.array,
    };

    constructor (props) {
        super(props);

        this.state = {
            userId: '',
            isButtonDisabled: false,
            usersValidationState: null,
            postTitle: {
                value: '',
                validationState: null,
                validationMessage: ''
            },
            postBody: {
                value: '',
                validationState: null,
                validationMessage: ''
            }
        };
    }

    __generateFieldGroup(props) {

        return (
            <FormGroup controlId={props.id} validationState={props.validationState}>
                <FormControl
                    className={props.className}
                    placeholder={props.placeholder}
                    componentClass={props.componentClass}
                    value={props.value}
                    onInput={props.onInput} />
                <HelpBlock>{props.validationMessage}</HelpBlock>
            </FormGroup>
        );
    }

    __generateNav() {

        return (
            <FormGroup className="text-left nav">
                <Button bsStyle="success" type='submit' disabled={this.state.isButtonDisabled}>Save Changes</Button>
                <Link to='/' className="btn btn-default">Cancel</Link>
            </FormGroup>
        )
    }

    __generateUsers(userArray) {

        return (
            userArray.map(user => (
                <Radio
                    name='radioUsers'
                    key={user.id}
                    value={user.id}
                    validationState = { this.state.usersValidationState }
                    onClick={ e => this.__handleUserSelect(e)}
                >
                    {user.name}
                </Radio>
            ))
        )
    }

    __setPostValue(event) {

        if (!!event.target.value) {

            this.setState({
                [event.target.id]: {
                    ...event.target.id,
                    value: event.target.value,
                    validationState: 'success',
                    validationMessage: ''
                },
                isButtonDisabled: false
            });

        } else {

            this.setState({
                [event.target.id]: {
                    ...event.target.id,
                    value: event.target.value,
                    validationState: 'error',
                    validationMessage: 'This field is required'
                },
                isButtonDisabled: true
            });
        }
    }

    __checkComments() {
        if (!isNaN(this.props.postId)) {
            return (
                <Row>
                    <Col md={12} className="text-left">
                        <Comments comments={this.props.comments} />
                    </Col>
                </Row>
            )

        }
    }

    __handleUserSelect(event) {
        this.setState({
            userId: event.target.value,
            usersValidationState: 'success',
            isButtonDisabled: false
        });
    }

    __handleSubmit(event) {
        event.preventDefault();

        let method;
        // let updatedContent;
        let url = apiUrl;
        const postData = {
            title: this.state.postTitle.value,
            body: this.state.postBody.value,
            userId: this.state.userId
        };

        if (!postData.title.length) {

            this.setState({
                postTitle: {
                    ...this.state.postTitle,
                    validationState: 'error',
                    validationMessage: 'This field is required'
                },
                isButtonDisabled: true
            });

        } else {

            this.setState({
                postTitle: {
                    ...this.state.postTitle,
                    validationState: 'success',
                    validationMessage: ''
                },
                isButtonDisabled: false
            });
        }

        if (!postData.body.length) {

            this.setState({
                postBody: {
                    ...this.state.postBody,
                    validationState: 'error',
                    validationMessage: 'This field is required'
                },
                isButtonDisabled: true
            });

        } else {

            this.setState({
                postBody: {
                    ...this.state.postBody,
                    validationState: 'success',
                    validationMessage: ''
                },
                isButtonDisabled: false
            });
        }

        if (!postData.userId.length) {
            this.setState({
                usersValidationState: 'error',
                isButtonDisabled: true
            });

        }

        if (isNaN(this.props.postId)) {
            method = 'POST';
        } else {
            method = 'PUT';
            postData.id = this.props.postId;
            url = `${apiUrl}/${this.props.postId}`;
        }

        if (this.state.usersValidationState === 'success' &&
            this.state.postTitle.validationState === 'success' &&
            this.state.postBody.validationState === 'success') {

                fetch(url, { method: method, data: postData})
                    .then(response => response.json())
                    .then(json => console.log(postData, json));
        }

    }

    componentWillReceiveProps(nextProps) {

        if (this.props.postTitle.value !== nextProps.postTitle) {

            this.setState({
                postTitle: {
                    ...this.state.postTitle,
                    value: nextProps.postTitle
                }
            });
        }

        if (this.props.postBody.value !== nextProps.postBody) {

            this.setState({
                postBody: {
                    ...this.state.postBody,
                    value: nextProps.postBody
                }
            });
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={6}>
                        <h2 className="text-left">Edit/Insert post</h2>
                        <form onSubmit={ e => this.__handleSubmit(e) }>
                            {this.__generateFieldGroup({
                                id:'postTitle',
                                value:this.state.postTitle.value,
                                onInput: (e => this.__setPostValue(e)),
                                validationState:this.state.postTitle.validationState,
                                validationMessage:this.state.postTitle.validationMessage
                            })}
                            {this.__generateFieldGroup({
                                id:'postBody',
                                className: 'post__body',
                                value:this.state.postBody.value,
                                componentClass:'textarea',
                                onInput: (e => this.__setPostValue(e)),
                                validationState:this.state.postBody.validationState,
                                validationMessage:this.state.postBody.validationMessage
                            })}
                            <FormGroup className="text-left">
                                <h3>Users</h3>
                                {this.__generateUsers(this.props.users)}
                            </FormGroup>
                            {this.__generateNav()}
                        </form>
                    </Col>
                </Row>
                {this.__checkComments()}
            </Grid>
        );
    }
}

export default Form;
