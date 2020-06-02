import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Statistic, Empty } from 'antd';
import { SmileOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Item from './item.js';
import '../index.css';

const { Panel } = Collapse;

/**
 * 任务列表
 * @param {unfinishedList} 未完成任务列表
 * @param {finishedList} 已完成任务列表 
 */
const TodoList = ({ unfinishedList, finishedList }) => {

    // const state = {
    //     expandIconPosition: 'left',
    // };

    // const onPositionChange = expandIconPosition => {
    //     this.setState({ expandIconPosition });
    // };

    const genExtra = (type) => (    //任务列表右上角的任务数量
        type === 'unfinished' ?
            <Statistic value={unfinishedList.length} prefix={<SmileOutlined />} />
            :
            <Statistic value={finishedList.length} prefix={<CheckCircleOutlined />} />
    )



    return (
        <div>
            <div className='task-container'>
                <Collapse
                    defaultActiveKey={['1']}
                >
                    <Panel className='task task--todo' header="待完成" key="1" extra={genExtra('unfinished')}>

                        {unfinishedList.length ? (
                            unfinishedList.map((item) => (
                                <Item
                                    id={item.id}
                                    text={item.text}
                                    isFinished={item.isFinished}
                                />
                            ))
                        ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="你还没有添加任务呢~" />
                            )
                        }
                    </Panel>
                    <Panel className='task task--done' header="已完成" key="2" extra={genExtra('finished')}>
                        {finishedList.length ? (
                            finishedList.map((item) => (
                                <Item
                                    id={item.id}
                                    text={item.text}
                                    isFinished={item.isFinished}
                                />
                            ))
                        ) : (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="空空如也~" />
                            )
                        }
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
}

/**
 * 使用PropTypes进行类型检查
 */
TodoList.propTypes = {
    finishedList: PropTypes.array.isRequired,
    unfinishedList: PropTypes.array.isRequired
}

/**
 * 将 State 数据转换到 Props 中
 * @param {state} store中维护的state
 */
const mapStateToProps = (state) => {
    return {
        finishedList: state.todoList.filter(item => item.isFinished),  //过滤出已完成的任务
        unfinishedList: state.todoList.filter(item => !item.isFinished)  //过滤出未完成的任务
    }
}

export default connect(mapStateToProps)(TodoList); //将store和组件联系在一起