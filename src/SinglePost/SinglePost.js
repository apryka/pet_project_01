import React, { Component } from 'react';
import { Row, Grid, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { apiUrl } from '../config';
import './SinglePost.scss';


class SinglePost extends Component {

    static propTypes = {
        title: PropTypes.string,
        body: PropTypes.string,
        id: PropTypes.number,
        handleOpenModal: PropTypes.func.isRequired
    };

    __handleDelete(event) {

        this.props.handleOpenModal(this.props.id);

        // fetch(url, { method: 'DELETE' })
        //     .then(response => response.json())
        //     .then(json => console.log(json));
    }

    render() {
        return (
            <Grid className="SinglePost">
                <Row>
                    <Col md={8} className="text-left">
                        <h2 className="SinglePost__header">{this.props.title}</h2>
                        <p>{this.props.body}</p>
                    </Col>
                    <Col md={4} className="text-right">
                        <Link to={ `/post/${this.props.id}` } className="btn btn-default">Open</Link>
                        <Button type="button" bsStyle="warning" onClick={ e => this.__handleDelete(e) }>Delete</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SinglePost;
