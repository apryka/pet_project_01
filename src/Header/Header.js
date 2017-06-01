import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logoUrl } from '../config';
import './Header.scss';


class Logo extends Component {

    render() {
        return (
            <img src={this.props.url} alt="Logo" className="App-logo" />
        )
    }
}


class Header extends Component {

    render() {
        return (
            <header className="App-header">
                <h1>
                    <Logo url={logoUrl} />
                    {this.props.text}
                </h1>
            </header>
        );
    }
}

Header.propTypes = {
    text: PropTypes.string
};

export default Header;
