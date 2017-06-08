import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid, Col, FormGroup, Radio, FormControl, Button } from 'react-bootstrap';
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
            postTitle: '',
            postBody: ''

        };
    }

    __generateFieldGroup(props) {
        const { id, placeholder, componentClass, value, onInput } = props;
        return (
            <FormGroup controlId={id}>
                <FormControl placeholder={placeholder} componentClass={componentClass} value={value} onInput={onInput} />
            </FormGroup>
        );
    }

    __generateUsers() {
        const userArray = this.props.users;

        return (
            userArray.map(user => (
                <Radio name='radioUsers' key={user.id} value={user.id}>
                    {user.name}
                </Radio>
            ))
        )
    }

    __setPostValue(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    __checkComments() {
        if (!isNaN(this.props.postId)) {
            return (
                <Row>
                    <Col md={12} className="text-left">
                        <Comments comments={this.props.comments} postId={this.props.postId} />
                    </Col>
                </Row>
            )
        }
    }

    componentWillReceiveProps() {
        this.setState({
            postTitle: this.props.postTitle,
            postBody: this.props.postBody
        });

        console.log('will receive props - props', this.props.postTitle);
        console.log('will receive props - state', this.state.postTitle);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={6}>
                        <h2 className="text-left">Edit/Insert post</h2>
                        <form>
                            {this.__generateFieldGroup({id:'postTitle', value:this.state.postTitle, onInput: (e => this.__setPostValue(e))})}
                            {this.__generateFieldGroup({id:'postBody', value:this.state.postBody, componentClass:'textarea', onInput: (e => this.__setPostValue(e))})}
                            <FormGroup className="text-left">
                                <h3>Users</h3>
                                {this.__generateUsers()}
                            </FormGroup>
                            <FormGroup className="text-left nav">
                                <Button bsStyle="success">Save Changes</Button>
                                <Button>Cancel</Button>
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
                {this.__checkComments()}
            </Grid>
        );
    }
}

export default Form;
