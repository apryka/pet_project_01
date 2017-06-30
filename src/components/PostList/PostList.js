import React, { Component } from 'react';
import SinglePost from '../../containers/SinglePost/SinglePost';
import { Row, Grid, Col } from 'react-bootstrap';
import { apiUrl } from '../../config';
import ModalWindow from '../Modal/Modal';
import './PostList.scss';
import { fetchPosts, deletePost, openModal, closeModal } from '../../actions/PostList-actions';
import { connect } from 'react-redux';


class PostList extends Component {

    constructor() {
        super();

        this.state = {
            posts: [],
            isModalOpen: false,
            postId: null
        };
    }

    __getPostsFromAPI() {
        // fetch(apiUrl)
        //     .then(response => response.json())
        //     .then(json => this.setState({posts: json}));

        this.props.fetchPosts();
    }

    __createPostsList() {
        // const postsArray = this.state.posts;
        const postsArray = this.props.posts;
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

    __handleDeletePost(postId) {
        // const postId = this.state.postId;
        // const url = `${apiUrl}/${postId}`;
        // const posts = this.state.posts.filter(post => post.id !== postId);
        //
        // this.setState({
        //     posts: posts,
        //     isModalOpen: false
        // });
        //
        // fetch(url, { method: 'DELETE' })
        //     .then(response => response.json())
        //     .then(json => console.log(json));

        this.props.deletePost(postId);
        this.props.closeModal();

    }

    __handleOpenModal(postId) {

        // this.setState({
        //     isModalOpen: true,
        //     postId: postId
        // });

        const buttonsArray = [
            {
                id: 1,
                label: 'Confirm from store',
                style: 'success',
                action: () => this.__handleDeletePost(postId)
            },
            {
                id: 2,
                label: 'Cancel from store',
                style: 'default',
                action: () => this.__handleCloseModal()
            }
        ];

        this.props.openModal({
            title: 'Delete Post from Store',
            body: `Please confirm to delete the post with ID ${postId}`,
            buttons: buttonsArray
            }
        );

    }

    __handleCloseModal() {
        // this.setState({
        //     isModalOpen: false
        // })
        this.props.closeModal()
    }

    componentDidMount() {
        this.__getPostsFromAPI();
    }

    render() {
        // styles available "success", "warning", "danger", "info", "default", "primary"
        const buttonsArray = [
            {
                id: 1,
                label: 'Confirm',
                style: 'success',
                action: e => this.__handleDeletePost(e)
            },
            {
                id: 2,
                label: 'Cancel',
                style: 'default',
                action: e => this.__handleCloseModal(e)
            }
        ];

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
                {/*<ModalWindow*/}
                    {/*isModalOpen = {this.state.isModalOpen}*/}
                    {/*closeFunction = { e => this.__handleCloseModal(e) }*/}
                    {/*modalTitle = 'Delete post'*/}
                    {/*modalBody = { `Please confirm to delete the post with ID ${this.state.postId}` }*/}
                    {/*buttons = { buttonsArray }*/}
                {/*/>*/}
                <ModalWindow
                    isModalOpen = { this.props.modal.isOpen }
                    closeFunction = { e => this.__handleCloseModal(e) }
                    modalTitle = { this.props.modal.title }
                    modalBody = { this.props.modal.body }
                    buttons = { this.props.modal.buttons }
                />
            </div>
        )
    }
}

// export default PostList;


function mapStateToProps(state) {
    return {
        posts: state.PostListReducer.posts,
        modal: state.PostListReducer.modal,
        postId: state.PostListReducer.postId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts(dispatch)),
        deletePost: (postId) => dispatch(deletePost(postId, dispatch)),
        openModal: ({title, body, buttons}) => dispatch(openModal({title, body, buttons}, dispatch)),
        closeModal: () => dispatch(closeModal(dispatch))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);