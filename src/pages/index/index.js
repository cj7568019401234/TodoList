import React from 'react';
import { Card, Layout, Avatar } from 'antd';
// import { Router, Route, Link } from 'react-router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../todos/index.css';
import './style/index.css'
import todoIcon from './style/todo.png';
import accountIcon from './style/account.png';

const { Header } = Layout;
const { Meta } = Card;

function Apps() {
    return (
        <Layout>
            <Header className='nav'>
                <label className='nav__index-logo'>❤ Home Page</label>
            </Header>
            <div className="container">
                <Link to='/todo'>
                <div className="site-card-wrapper">
                    <Card style={{ width: 300 }}>
                        <Meta
                            avatar={<Avatar src={todoIcon} />}
                            title="TodoList"
                            description="可添加、删除、修改待办任务"
                        />
                    </Card>
                    <Card style={{ width: 300}}>
                        <Meta
                            avatar={<Avatar src={accountIcon} />}
                            title="Account book"
                            description="多身份记账账本"
                        />
                    </Card>
                </div>
                </Link>
            </div>
            <footer>
                <p>Copyright © 2020 TodoList. Posted by : Cj</p>
            </footer>
        </Layout>
    );
}

export default Apps;