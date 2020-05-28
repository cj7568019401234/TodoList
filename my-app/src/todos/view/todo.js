import React from 'react';
import AddTodo from './addTodo.js'
import Item from './item.js';
import './index.css';

class TodoList extends React.Component {
    render() {
        const { todoList } = this.state;
        const unfinishedList = todoList.filter(item => item.status === 'unfinished');   //过滤出未完成的任务
        const finishedList = todoList.filter(item => item.status === 'finished');    //过滤出已完成的任务

        return (
            <div>
                <AddTodo />
                <div className='task-container'>
                    <div className='task task--todo'>
                        <h3>待完成
                            <span className='btn btn__num'>{unfinishedList.length}</span>
                        </h3>
                        <div className='task__line task__line--first'></div>
                        <Item
                            onCheck={this.alterTask}
                            taskList={unfinishedList}
                        />
                    </div>
                    <div className='task task--done'>
                        <h3>已完成
                            <span className='btn btn__num'>{finishedList.length}</span>
                        </h3>
                        <div className='task__line task__line--first'></div>
                            finishedList.map( (item)=>(
                                <Item
                                    id={item.id}
                                    text={item.text}
                                    finished={item.finished}
                                />
                            ))
                    </div>
                </div>
                <footer>
                    <p>Copyright © 2020 ToDoList. Posted by : Cj</p>
                </footer>
            </div>
        );
    }
}

export default TodoList;