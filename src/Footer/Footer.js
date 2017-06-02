import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';


class Footer extends Component {

    static propTypes = {
        text: PropTypes.string
    };

    render() {
        return (
            <footer className="App-footer">
                {this.props.text}
            </footer>
        )
    }
}

export default Footer;
