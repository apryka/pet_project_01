import React, { Component } from 'react';
import { Well } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Comments.scss';


class Comments extends Component {

    static propTypes = {
        comments: PropTypes.array,
    };

    __getComments() {
        const commentArray = this.props.comments;

        return commentArray.map(comment => this.__wrapComment(comment));

    }

    __wrapComment(comment) {
        return (
            <Well key={comment.id}>
                {comment.body}
            </Well>
        )
    }

    render() {
        return (
            <div className="Comments">
                <h3>Comments</h3>
                {this.__getComments()}
            </div>
        )
    }
}

export default Comments;
