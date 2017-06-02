import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';
import { logoUrl } from '../config';
import './Header.scss';

class Header extends Component {

    static propTypes = {
        text: PropTypes.string
    };

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

export default Header;
