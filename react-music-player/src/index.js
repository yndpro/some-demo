import React from 'react';
import { render } from 'react-dom';
import {Router,IndexRoute,Route,hashHistory,Link} from 'react-router';
import App from'./app';
import Player from './page/player';
import PlayList from './page/play_list';

var Root = React.createClass({
    render : function(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={PlayList}></Route>
                </Route>
            </Router>
        )
    }
});

render(
    <Root/>,
    document.getElementById('root')
)