import React, { Component } from 'react';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
import Form from '../Form/Form';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { apiUrl, apiUsers } from '../../config';
import { fetchSinglePost, fetchUsers,fetchComments } from '../../actions/PostDetails-actions';
import { connect } from 'react-redux';
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

        // fetch(apiUsers)
        //     .then(response => response.json())
        //     .then(json => this.setState({users: json}));

        this.props.fetchUsers();

        // this.props.fetchComments(this.state.post.id);

        if (!this.props.match.params.id) { return };

        // fetch(`${apiUrl}/${this.state.post.id}/comments`)
        //     .then(response => response.json())
        //     .then(json => this.setState({comments: json}));

        this.props.fetchComments(this.state.post.id);

        // fetch(`${apiUrl}/${this.state.post.id}`)
        //     .then(response => response.json())
        //     .then(json => this.setState({post: json}));

        this.props.fetchSinglePost(this.state.post.id);

    }

    componentDidMount() {
        this.__getDataFromAPI();
    }

    render() {
        return (
            <div className='PostDetails'>
                <Header text="Pet project" />
                <Breadcrumbs postId={this.state.post.id} postTitle={this.props.post.title} />
                <Form
                    users={this.props.users}
                    comments={this.props.comments}
                    postId={this.state.post.id}
                    postTitle={this.props.post.title}
                    postBody={this.props.post.body}
                />
                <Footer text={`Copyright ${new Date().getFullYear()}`} />
            </div>
        )
    }
}

// export default PostDetails;


function mapStateToProps(state) {
    return {
        users: state.PostDetailsReducer.users,
        comments: state.PostDetailsReducer.comments,
        post: state.PostDetailsReducer.post

    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSinglePost: (postId) => dispatch(fetchSinglePost(postId, dispatch)),
        fetchUsers: () => dispatch(fetchUsers( dispatch)),
        fetchComments: (postId) => dispatch(fetchComments(postId, dispatch))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);