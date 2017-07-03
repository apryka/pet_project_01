import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid, Col, FormGroup, FormControl, Button, ButtonToolbar } from 'react-bootstrap';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
import { apiUrl, apiUsers } from '../../config';
import { connect } from 'react-redux';
import './Login.scss';

class Login extends Component {

    static propTypes = {

    };

    constructor (props) {
        super(props);

        this.state = {
            login: '',
            password: ''

        };

    }

    __handleSubmit(event) {
        event.preventDefault();

        console.log('SUBMIT', apiUsers);
        console.log(this.state.login);
        console.log(this.state.password);

        let customHeaders = new Headers();
        customHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        let login = this.state.login;
        let password = this.state.password;

        let data = {login, password};


        let request = { method: 'POST', body: this.__getQueryString(data), header: customHeaders };

        fetch(apiUsers, request)
            .then(response => response.json())
            .then(users => console.log(users));

    }

    __getQueryString(data) {

       return Object.keys(data).reduce((acc, key) => {
           key = encodeURIComponent(key);

            let value = encodeURIComponent(data[key]);
            return (`${acc}&${key}=${value}`);

        }, '');

       //console.log('params', params);

        // return Object.keys(data).reduce((acc, key) => {
        //     key = encodeURIComponent(key);
        //     let value = encodeURIComponent(data[key]); console.log(`${acc}&${key}=${value}`);
        //     return `${acc}&${key}=${value}`;
        // }, "").substr(1);
    }


    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (

        <div className='Login'>
            <Header text="Pet project" />
            <Grid>
                <Row>
                    <Col md={6}>
                        <h2 className="text-left">Login</h2>
                        <form onSubmit={ e => this.__handleSubmit(e) }>
                            <FormGroup>
                                <FormControl
                                    type = "text"
                                    placeholder = "Email"
                                    value = {this.state.login}
                                    onChange = { e => this.setState({login: e.target.value})}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange = { e => this.setState({password: e.target.value})}
                                />
                            </FormGroup>
                            <ButtonToolbar>
                                <Button bsStyle="primary" type="submit">Login</Button>
                            </ButtonToolbar>
                        </form>
                    </Col>
                </Row>
            </Grid>
            <Footer text={`Copyright ${new Date().getFullYear()}`} />
        </div>

        );
    }
}

export default Login;