import AddTodo from '/view/addTodo.js'

import React from 'react';
import './index.css';

class TaskList extends React.Component {
    state = {
        value: '', //当前任务内容
        nextTodoId: 0, //当前任务id
        todoList: [] //任务列表
    }

    render() {
        const { value, todoList } = this.state;
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
                        <Task
                            onCheck={this.alterTask}
                            taskList={unfinishedList}
                        />
                    </div>
                    <div className='task task--done'>
                        <h3>已完成
                            <span className='btn btn__num'>{finishedList.length}</span>
                        </h3>
                        <div className='task__line task__line--first'></div>
                        <Task
                            checked='checked'
                            onCheck={this.alterTask}
                            taskList={finishedList}
                        />
                    </div>
                </div>
                <footer>
                    <p>Copyright © 2020 ToDoList. Posted by : Cj</p>
                </footer>
            </div>
        );
    }
}

export default TaskList;