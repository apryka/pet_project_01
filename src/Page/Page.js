import React, { Component } from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import PostList from '../PostList/PostList';
import Footer from '../Footer/Footer';
import './Page.scss';

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: ''
        };

    }

    __handleFilterText(text) {
        this.setState({
            filterText: text
        });
    }

    render() {
        return (
            <div className="Page">
                <Header text="Pet project"/>
                <Search onFilterTextSubmit = { (text) => this.__handleFilterText(text)}/>
                <PostList filteredText={ this.state.filterText } />
                <Footer text={`Copyright ${new Date().getFullYear()}`}  />
            </div>
        );
    }
}

export default Page;
