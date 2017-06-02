import React, { Component } from 'react';
import { Row, Grid, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './SinglePost.scss';


class SinglePost extends Component {

    static propTypes = {
        title: PropTypes.string,
        body: PropTypes.string,
    };

    render() {
        return (
            <Grid className="SinglePost">
                <Row>
                    <Col md={8} className="text-left">
                        <h2 className="SinglePost__header">{this.props.title}</h2>
                        <p>{this.props.body}</p>
                    </Col>
                    <Col md={4} className="text-right">
                        <Button type="button">Open</Button>
                        <Button type="button" bsStyle="warning">Delete</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default SinglePost;
