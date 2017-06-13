import React, { Component } from 'react';
import SinglePost from '../SinglePost/SinglePost';
import { Row, Grid, Col } from 'react-bootstrap';
import { apiUrl } from '../config';
import ModalWindow from '../Modal/Modal';
import './PostList.scss';


class PostList extends Component {

    constructor() {
        super();

        this.state = {
            posts: [],
            isModalOpen: false,
            postId: -1
        };
    }

    __getPostsFromAPI() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(json => this.setState({posts: json}));
    }

    __createPostsList() {
        const postsArray = this.state.posts;
        const filterText = this.props.filteredText;
        let finalArray = [];

        postsArray.filter(post => {
            (post.title.includes(filterText) || post.body.includes(filterText)) ? finalArray.push(this.__generateSinglePost(post)) : null
        });

        return finalArray;

    }

    __generateSinglePost(post) {
        return (
            <SinglePost key={post.id} id={post.id} title={post.title} body={post.body} handleOpenModal={ e => this.__handleOpenModal(e) } />
        )
    }

    __handleDeletePost() {
        const postId = this.state.postId;
        const url = `${apiUrl}/${postId}`;
        const posts = this.state.posts.filter(post => post.id !== postId);

        console.log('Remove post with ID - ', postId);
        console.log(url);

        this.setState({
            posts: posts,
            isModalOpen: false
        });

        fetch(url, { method: 'DELETE' })
            .then(response => response.json())
            .then(json => console.log(json));

    }

    __handleOpenModal(postId) {
        // const url = `${apiUrl}/${postId}`;

        this.setState({
            isModalOpen: true,
            postId: postId
        });

    }

    __handleCloseModal() {
        this.setState({
            isModalOpen: false
        })
    }

    componentDidMount() {
        this.__getPostsFromAPI();
    }

    render() {

        return (

            <div className="PostList">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <h6 className="text-left">Items found: {this.__createPostsList().length}</h6>
                        </Col>
                    </Row>
                </Grid>
                { this.__createPostsList() }
                <ModalWindow
                    isModalOpen = {this.state.isModalOpen}
                    closeModal = { e => this.__handleCloseModal(e) }
                    deletePost = { e => this.__handleDeletePost(e) }
                    modalTitle = 'Delete post'
                    modalBody = { `Please confirm to delete the post with ID ${this.state.postId}` }
                />
            </div>
        )
    }
}

export default PostList;
