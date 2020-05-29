import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './item.js';
import './index.css';


/**
 * 任务列表
 * @param {unfinishedList} 未完成任务列表
 * @param {finishedList} 已完成任务列表 
 */
const TodoList = ({ unfinishedList, finishedList }) => {
    return (
        <div>
            <div className='task-container'>
                <div className='task task--todo'>
                    <h3>待完成
                        <span className='btn btn__num'>{unfinishedList.length}</span>
                    </h3>
                    <div className='task__line task__line--first'></div>
                    {
                        unfinishedList.map((item) => (
                            <Item
                                id={item.id}
                                text={item.text}
                                isFinished={item.isFinished}
                            />
                        ))
                    }
                </div>
                <div className='task task--done'>
                    <h3>已完成
                        <span className='btn btn__num'>{finishedList.length}</span>
                    </h3>
                    <div className='task__line task__line--first'></div>
                    {
                        finishedList.map((item) => (
                            <Item
                                id={item.id}
                                text={item.text}
                                isFinished={item.isFinished}
                            />
                        ))
                    }
                </div>
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