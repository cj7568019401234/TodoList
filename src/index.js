import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router'
import Apps from './pages/index/index';
import TodoApp from './pages/todos/index'
import 'antd/dist/antd.css'
import store from './store/index.js'
// import { IndexRoute } from 'react-router'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <Route path="/" component={Apps}>
      {/* 当 url 为/时渲染 Dashboard */}
      {/* <IndexRoute component={Dashboard} /> */}
      <Route path="todo" component={TodoApp} />
      <Route path="account" component={TodoApp}>
      </Route>
    </Route>
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();