import React from 'react';
import { Card, Layout, Avatar } from 'antd';
import { Link } from "react-router-dom";
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
                <div className="site-card-wrapper">
                    <Link to='/todo'>
                        <Card style={{ width: 300 }}>
                            <Meta
                                avatar={<Avatar src={todoIcon} />}
                                title="TodoList"
                                description="可添加、删除、修改待办任务"
                            />
                        </Card>
                    </Link>
                    <Link to='/account'>
                        <Card style={{ width: 300 }}>
                            <Meta
                                avatar={<Avatar src={accountIcon} />}
                                title="Account book"
                                description="多身份记账账本"
                            />
                        </Card>
                    </Link>
                </div>
            </div>
            <footer>
                <p>Copyright © 2020 TodoList. Posted by : Cj</p>
            </footer>
        </Layout>
    );
}

export default Apps;