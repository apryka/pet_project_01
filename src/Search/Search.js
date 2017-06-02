import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import './Search.scss';


class Search extends Component {

    static propTypes = {
        onFilterTextSubmit: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            filterText: ''
        };

    }

    __handleInputChange(event) {
        this.setState({
            filterText: event.target.value
        });
    }

    __handleFormSubmit(event) {
        event.preventDefault();

        this.props.onFilterTextSubmit(this.state.filterText);

    }

    render() {
        return (
            <Grid className="App-navigation">
                <Row>
                    <Col md={6}>
                        <form onSubmit={ (e) => this.__handleFormSubmit(e) }>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        placeholder="Search for ..."
                                        value={this.state.filterText}
                                        onChange={(e) => this.__handleInputChange(e)}
                                    />
                                    <InputGroup.Button>
                                        <Button className="btn btn-default" type="submit">Search</Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
            </Grid>

        )
    }
}


export default Search;
