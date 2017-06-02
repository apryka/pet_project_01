import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Logo.scss';

class Logo extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired
    };

    render() {
        return (
            <img src={this.props.url} alt="Logo" className="App-logo" />
        )
    }
}

export default Logo;