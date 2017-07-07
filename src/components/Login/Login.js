import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid, Col, FormGroup, FormControl, Button, ButtonToolbar } from 'react-bootstrap';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
import { apiUrl, apiUsers, apiUserInfo, apiLogin, apiUsersList } from '../../config';
import { connect } from 'react-redux';
import './Login.scss';

class Login extends Component {

    static propTypes = {

    };

    constructor (props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            token: ''

        };

    }

    __getCustomHeaders() {
        const customHeaders = new Headers();
        customHeaders.append('content-type', 'application/x-www-form-urlencoded');
debugger;
        return customHeaders;
    }

    __handleFetch(request) {
        fetch(request)
            .then(response => {
                switch (response.status) {
                    case 500: console.error('Some server error'); break;
                    case 401: console.error('Unauthorized'); break;
                }
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                    throw Error(response.statusText);
                }
            })
            .then(response => this.__handleFetchResponse(response))
            .catch(error => {
                console.error(error);
            });
    }

    __handleFetchResponse(response) {
        console.log('handle fetch response', response);
        this.setState({
            token: response.token
        });
    }

    __displayUserData(response) {
        console.log('displayUserData', response);
        console.log('firstaname: ' + response.firstName, 'lastname: ' + response.lastName);
        this.setState({
            firstName: response.firstName,
            lastName: response.lastName
        });
    }



    __handleSubmit(event) {
        event.preventDefault(); console.log(this.state);
        let login = this.state.login;
        // let login = encodeURIComponent('luannhayes@qualitern.com');

        let password = this.state.password;
        // let password = encodeURIComponent('lesa');
        let data = {login, password};

        let formData = `login=${encodeURIComponent(this.state.login)}&password=${encodeURIComponent(this.state.password)}`;

        // let request = {
        //     method: 'POST',
        //     header: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     body: formData
        // };
        // let request = ('POST', formData, this.__getCustomHeaders());
        // console.log(request, apiLogin);

        console.log(data);

        let request = new Request(apiLogin, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            // body: 'login=luannhayes@qualitern.com&password=lesa',
            body: `login=${data.login}&password=${data.password}`
        });

        this.__handleFetch(request);
        // console.log('token', this.__handleFetch(request));

        // fetch(request)
        //     .then(response => {
        //         switch (response.status) {
        //             case 500: console.error('Some server error'); break;
        //             case 401: console.error('Unauthorized'); break;
        //         }
        //         if (response.ok) {
        //             return response.json();
        //             // console.log(response.json());
        //         } else {
        //             return Promise.reject(response);
        //             throw Error(response.statusText);
        //         }
        //     })
        //     .then(token => console.log(token))
        //     .catch(error => {
        //         console.log(error);
        //     });


        // [GET] /auth/me

        let token = '591d644a518bdbf17065488f';
        // let token = '123456789';
        let requestGet = new Request(apiUserInfo, {
            method : 'GET',
            headers: new Headers({
                'Authorization': token
            })
        });

        fetch(requestGet)
            .then(response => {
                switch (response.status) {
                    case 500: console.error('Some server error'); break;
                    case 401: console.error('Unauthorized'); break;
                }
                if (response.ok) {
                    return response.json();
                    // console.log(response.json());
                } else {
                    return Promise.reject(response);
                    throw Error(response.statusText);
                }
            })
            .then(response => this.__displayUserData(response))
            .catch(error => {
                console.log(error);
            });


        // [GET] /authors

        let requestGetAuthors = new Request(apiUsersList, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': token
                })
            }
        );

        fetch(requestGetAuthors)
            .then(response => {
                switch (response.status) {
                    case 500: console.error('Some server error'); break;
                    case 401: console.error('Unauthorized'); break;
                }
                if (response.ok) {
                    return response.json();
                    // console.log(response.json());
                } else {
                    return Promise.reject(response);
                    throw Error(response.statusText);
                }
            })
            .then(response => console.log(response))
            .catch(error => {
                console.log(error);
            });


    }

    __getQuery(data) {

       return Object.keys(data).reduce((acc, key) => {
           key = encodeURIComponent(key);

            let value = encodeURIComponent(data[key]);
            return (`${acc}&${key}=${value}`);

        }, '').substr(1);

    }


    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (

        <div className='Login'>
            <Header text="Pet project" />
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2 className="text-right">
                            {this.state.firstName} {this.state.lastName}
                        </h2>
                    </Col>
                </Row>
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