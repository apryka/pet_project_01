import React, { Component } from 'react';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
import Form from '../Form/Form';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { apiUrl, apiUsers } from '../../config';
import './PostDetails.scss';


class PostDetails extends Component {

    constructor (props) {
        super(props);

        this.state = {
            users: [],
            comments: [],
            post: {
                id:  parseInt(this.props.match.params.id, 10),
                title: '',
                body: '',
                userId: null,
            },

        };
    }

    __getDataFromAPI() {

        fetch(apiUsers)
            .then(response => response.json())
            .then(json => this.setState({users: json}));

        if (!this.props.match.params.id) { return };

        fetch(`${apiUrl}/${this.state.post.id}/comments`)
            .then(response => response.json())
            .then(json => this.setState({comments: json}));

        fetch(`${apiUrl}/${this.state.post.id}`)
            .then(response => response.json())
            .then(json => this.setState({post: json}));

    }

    componentDidMount() {
        this.__getDataFromAPI();
    }

    render() {
        return (
            <div className='PostDetails'>
                <Header text="Pet project" />
                <Breadcrumbs postId={this.state.post.id} postTitle={this.state.post.title} />
                <Form
                    users={this.state.users}
                    comments={this.state.comments}
                    postId={this.state.post.id}
                    postTitle={this.state.post.title}
                    postBody={this.state.post.body}
                />
                <Footer text={`Copyright ${new Date().getFullYear()}`} />
            </div>
        )
    }
}

export default PostDetails;
