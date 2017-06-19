import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

        let timerId;
        let inputValue = event.target.value;

        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout( () => {
            this.__setFilterText(inputValue);
        }, 1000);

        this.setState({
            filterText: inputValue
        });

    }

    __setFilterText(inputValue) {

        this.props.onFilterTextSubmit(inputValue);

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
                                        <Button type="submit">Search</Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </FormGroup>
                        </form>
                    </Col>
                    <Col md={6} className="text-right">
                        <Link to="/new-post" className="btn btn-success">Add new post</Link>
                    </Col>
                </Row>
            </Grid>

        )
    }
}


export default Search;
