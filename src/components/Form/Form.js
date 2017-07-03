import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid, Col, FormGroup, Radio, FormControl, Button, HelpBlock } from 'react-bootstrap';
import { apiUrl } from '../../config';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { updatePost } from '../../actions/Form-actions';
import { connect } from 'react-redux';
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
            postTitle: {
                value: '',
                validationState: null,
                validationMessage: ''
            },
            postBody: {
                value: '',
                validationState: null,
                validationMessage: ''
            },
            postUsers: {
                validationState: null
            }
        };

    }

    __isFormValid() {

        const formFieldsState = [
            this.state.postTitle,
            this.state.postBody,
            this.state.postUsers
        ];
        console.log(formFieldsState);
        for (let field of formFieldsState) {
            if (field.validationState !== 'success') return false;
        }

        return true;
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

    __generateUsers(userArray) { console.log('user', userArray);

        return (
            userArray.map(user => (
                <Radio
                    name='radioUsers'
                    key={user.id}
                    value={user.id}
                    validationState = { this.state.postUsers.validationState }
                    onClick={ e => this.__handleUserSelect(e)}
                >
                    {user.firstName} {user.lastName}
                </Radio>
            ))
        )
    }

    __setPostValue(event) {

        //console.log(event.target);

        // const form = {
        //     [event.target.id] : {
        //         value: event.target.value
        //     }
        // };

        //console.log(form);

        //this.props.updateForm(form);
        // console.log(this.props);
        //event.target.value=this.props.postTitle.value;

        //console.log(this.props.post.title);

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

    __handleFieldState(value, validationState, validationMessage, isButtonDisabled) {

        this.setState({
            [value]: {
                ...this.state[value],
                validationState: validationState,
                validationMessage: validationMessage
            },
            isButtonDisabled: isButtonDisabled
        });

    }

    __handleUserSelect(event) {
        this.setState({
            postUsers: {
                ...this.state.postUsers,
                validationState: 'success'
            },
            userId: event.target.value,
            isButtonDisabled: false
        });
    }

    __handleSubmit(event) { console.log('submit');
        event.preventDefault();

        let method;
        let url = apiUrl;
        const postData = {
            title: this.state.postTitle.value,
            body: this.state.postBody.value,
            userId: this.state.userId
        };

        if (!postData.title.length) {

            this.__handleFieldState('postTitle', 'error', 'This field is required', true)

        } else {

            this.__handleFieldState('postTitle', 'success', '', false)
        }

        if (!postData.body.length) {

            this.__handleFieldState('postBody', 'error', 'This field is required', true)

        } else {

            this.__handleFieldState('postBody', 'success', '', false)
        }

        if (!postData.userId.length) {
            this.setState({
                postUsers: {
                    ...this.state.postUsers,
                    validationState: 'error'
                },
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

        if (this.__isFormValid()) {

            // fetch(url, { method: method, data: postData})
            //     .then(response => response.json())
            //     .then(json => console.log(postData, json));

            this.props.updatePost(url, { method: method, data: postData})
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

    render() { console.log(this.state);
        return (
            <Grid>
                <Row>
                    <Col md={6}>
                        <h2 className="text-left">Edit/Insert post</h2>
                        <form onSubmit={ e => this.__handleSubmit(e) }>
                            {this.__generateFieldGroup({
                                id:'postTitle',
                                // value:this.props.post.title,
                                value: this.state.postTitle.value,
                                onInput: (e => this.__setPostValue(e)),
                                validationState:this.state.postTitle.validationState,
                                validationMessage:this.state.postTitle.validationMessage
                            })}
                            {this.__generateFieldGroup({
                                id:'postBody',
                                className: 'post__body',
                                value: this.state.postBody.value,
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

// export default Form;


function mapStateToProps(state) { console.log('STATE', state.PostDetailsReducer.post.title, state.FormReducer.postTitle.value);
    return {
        users: state.PostDetailsReducer.users,
        comments: state.PostDetailsReducer.comments,
        post: state.PostDetailsReducer.post,

        // userId: state.FormReducer.userId,
        // isButtonDisabled: state.FormReducer.isButtonDisabled,
        // postTitle: {
        //     value: state.FormReducer.postTitle.value
        // },
        // postBody: {
        //     value: state.FormReducer.postBody.value
        // }

    };
}

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (url, { method, postData}) => dispatch(updatePost(url, { method, postData}, dispatch))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);