import React, { PropTypes } from 'react';
import Item from './item.js';
import './index.css';

class TodoList extends React.Component {
    render() {
        const { todoList } = this.state;
        const unfinishedList = todoList.filter(item => item.isFinished === false);   //过滤出未完成的任务
        const finishedList = todoList.filter(item => item.isFinished === true);    //过滤出已完成的任务
        return (
            <div>
                <div className='task-container'>
                    <div className='task task--todo'>
                        <h3>待完成
                            <span className='btn btn__num'>{unfinishedList.length}</span>
                        </h3>
                        <div className='task__line task__line--first'></div>
                        {
                        unfinishedList.map((item)=>(
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
                        finishedList.map((item)=>(
                            <Item
                                id={item.id}
                                text={item.text}
                                isFinished={item.isFinished}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

TodoList.propTypes = {
    todoList : PropTypes.array.isRequired
}

export default TodoList;