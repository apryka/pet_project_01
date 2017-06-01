import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';


class Footer extends Component {

    render() {
        return (
            <footer className="App-footer">
                {this.props.text}
            </footer>
        )
    }
}

Footer.propTypes = {
    text: PropTypes.string
};


export default Footer;
