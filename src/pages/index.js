import React from 'react';
import { Card, Col, Row, Layout } from 'antd';

import './todos/index.css';

const { Header } = Layout;
const { Meta } = Card;

function Apps() {
    return (
        <div className="site-card-wrapper">
            <Layout>
                <Header className='nav'></Header>
            </Layout>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                {/* <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                /> */}
            </Card>
        </div>
    );
}

export default Apps;