import React, { Component } from 'react';
import { Grid, Row, Col, Breadcrumb } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Breadcrumbs.scss';


class Breadcrumbs extends Component {

    static propTypes = {
        postTitle: PropTypes.string,
        postId: PropTypes.number,
    };

    __setActiveItem() {
        if (!isNaN(this.props.postId)) {
            return (
                `${this.props.postTitle} (${this.props.postId})`
            )
        } else {
            return(
                'New post'
            )
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Breadcrumb className="text-left">
                            <Breadcrumb.Item href="/">
                                Home
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                {this.__setActiveItem()}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Breadcrumbs;