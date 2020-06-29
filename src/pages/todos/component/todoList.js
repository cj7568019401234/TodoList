import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Statistic, Empty } from 'antd';
import { SmileOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { actions } from '../../../store/todos/index';
import Item from './item.js';
import '../index.css';
const TodoService = require('../../../services/todoServer');
const { Panel } = Collapse;

/**
 * 任务列表
 * @param {unfinishedList} 未完成任务列表
 * @param {finishedList} 已完成任务列表 
 */
const TodoList = ({ unfinishedList, finishedList, onInit }) => {
    /**
     * 渲染完之后去服务器获取数据
     */
    useEffect(() => {
        TodoService.default.getTodo()  //向服务器请求todo数据
            .then((result) => {
                onInit(result);//state更新成服务器的数据
            })
        console.log('fetchData');
    }, []);//只请求一次

    /**
     * @param {type} 任务类型，unfinished为待完成，finished为已完成
     * 任务列表右上角的任务数量
     */
    const genExtra = (type) => (
        type === 'unfinished' ?
            <Statistic value={unfinishedList.length} prefix={<SmileOutlined />} />
            :
            <Statistic value={finishedList.length} prefix={<CheckCircleOutlined />} />
    )

    return (
        <div>
            <div className='task-container'>
                <Collapse defaultActiveKey={['1', '2']} >
                    <Panel className='task task--todo' header="待完成" key="1" extra={genExtra('unfinished')}>
                        {unfinishedList.length ? (
                            unfinishedList.map((item) => (
                                <Item
                                    key={item._id}
                                    id={item._id}
                                    text={item.text}
                                    isFinished={item.isFinished}
                                    endDate={item.endDate}
                                    endTime={item.endTime}
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
                                    key={item._id}
                                    id={item._id}
                                    text={item.text}
                                    isFinished={item.isFinished}
                                    endDate={item.endDate}
                                    endTime={item.endTime}
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
    unfinishedList: PropTypes.array.isRequired,
    onInit: PropTypes.func.isRequired  //指定初始化函数被传递给组件
}

/**
 * 将 State 数据转换到 Props 中
 * @param {state} store中维护的state
 */
const mapStateToProps = (state) => {
    return {
        finishedList: state.todoList.filter(item => item.isFinished),  //过滤出已完成的任务
        unfinishedList: state.todoList.filter(item => !item.isFinished),  //过滤出未完成的任务
    }
}

/**
 * 将需要绑定的响应事件注入到组件上（props上）
 * @param {dispatch}  dispatch() 方法
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onInit: (todoList) => {    //将addTodo这个action 作为 props 绑定到组件中
            dispatch(actions.initTodo(todoList))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList); //将store和组件联系在一起
