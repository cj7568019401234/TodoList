import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TodoApp from './pages/todos/index';
// import { Card, Col, Row } from 'Antd';
import 'antd/dist/antd.css'
import store from './store/index.js'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    {/* <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
        </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
        </Card>
        </Col>
      </Row>
    </div> */}
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();