import React from 'react';
import './index.css';


class TaskList extends React.Component {
    state = {
        value: '', //当前任务内容
        todoList: [] //任务列表
    }

    /**
     * 勾选任务状态或删除任务
     * @param {event}  发生点击事件的Event对象
     */
    alterTask = (taskType, taskId) => {
        const { todoList } = this.state;
        let taskIndex = 0;

        todoList.some((item, index) => { //查找
            if (item.id === taskId) {
                taskIndex = index;
                return true;
            }
            return false;
        })

        const status = todoList[taskIndex].status;
        if (taskType === 'check') { //扭转任务状态
            todoList[taskIndex].status = status === 'unfinished' ? 'finished' : 'unfinished';
        } else if (taskType === 'delete') { //删除任务
            todoList.splice(taskIndex, 1);
        } else return;

        this.setState({
            todoList: todoList,
        })
    };

    render() {
        const {  todoList } = this.state;
        const unfinishedList = todoList.filter(item => item.status === 'unfinished');   //过滤出未完成的任务
        const finishedList = todoList.filter(item => item.status === 'finished');    //过滤出已完成的任务

        return (
            <div>
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