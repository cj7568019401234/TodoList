import React, { useEffect, useState } from 'react';
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
    const [todoList, setTodoList] = useState(unfinishedList);
    const [doneList, setDoneList] = useState(finishedList);

    /**
     * 渲染完之后去服务器获取数据
     */
    useEffect(() => {
        (async function () {
            let result = await TodoService.default.getTodo();  //向服务器请求todo数据
            if (result.length > 0) onInit();//state更新成服务器的数据
            setTodoList(result.filter(item => !item.isFinished));//过滤出已完成的任务
            setDoneList(result.filter(item => item.isFinished));//过滤出未完成的任务

            console.log('fetchData');
        })();
    }, [unfinishedList, finishedList]);//只有在数据改变了才去请求，否则会一直去请求

    /**
     * @param {type} 任务类型，unfinished为待完成，finished为已完成
     * 任务列表右上角的任务数量
     */
    const genExtra = (type) => (
        type === 'unfinished' ?
            <Statistic value={todoList.length} prefix={<SmileOutlined />} />
            :
            <Statistic value={doneList.length} prefix={<CheckCircleOutlined />} />
    )

    return (
        <div>
            <div className='task-container'>
                <Collapse defaultActiveKey={['1', '2']} >
                    <Panel className='task task--todo' header="待完成" key="1" extra={genExtra('unfinished')}>
                        {todoList.length ? (
                            todoList.map((item) => (
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
                        {doneList.length ? (
                            doneList.map((item) => (
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
        onInit: () => {    //将addTodo这个action 作为 props 绑定到组件中
            dispatch(actions.initTodo())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList); //将store和组件联系在一起
