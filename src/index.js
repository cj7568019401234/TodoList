import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodoApp from './pages/todos/index'
import Account from './pages/account/index'
import Apps from './pages/index/index';
import 'antd/dist/antd.css'
import store from './store/index.js'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Apps />
        </Route>
        <Route path="/todo">
          <TodoApp />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();