import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Page from '../Page/Page';
import PostDetails from '../../components/PostDetails/PostDetails';
import './App.scss';
import store from '../../store';
import { Provider } from 'react-redux';

class App extends Component {

    // render() {
    //     return (
    //         <Router>
    //             <div className="App">
    //                 <Route exact path="/" component={Page} />
    //                 <Route exact path="/post/:id" component={PostDetails} />
    //                 <Route exact path="/new-post" component={PostDetails} />
    //             </div>
    //         </Router>
    //         )
    // }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Route exact path="/" component={Page} />
                        <Route exact path="/post/:id" component={PostDetails} />
                        <Route exact path="/new-post" component={PostDetails} />
                    </div>
                </Router>
            </Provider>
        )
    }

}

export default App;
