import React, { Component } from 'react';
import SinglePost from '../SinglePost/SinglePost';
import { Row, Grid, Col } from 'react-bootstrap';
import { apiUrl } from '../config';
import './PostList.scss';


class PostList extends Component {

    constructor() {
        super();

        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        this.__getPostsFromAPI();
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
            <SinglePost key={post.id} id={post.id} title={post.title} body={post.body} />
        )
    }

    render() {

        return (
            <div className="posts-container">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <h6 className="text-left">Items found: {this.__createPostsList().length}</h6>
                        </Col>
                    </Row>
                </Grid>
                { this.__createPostsList() }
            </div>
        )
    }
}

export default PostList;
