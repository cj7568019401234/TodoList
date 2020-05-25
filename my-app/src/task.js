import React from 'react';
import './index.css';

/**
 * 任务
 * @param {props.taskType}  任务类型：unfinished为待完成；finished为已完成
 * @param {props.onCheck}   绑定函数：扭转状态或删除任务时调用
 * @param {props.checked}   勾选类型：待完成任务不勾选；已完成任务勾选
 * @param {props.taskList}  任务列表：包括所有任务，根据任务状态区分是待完成任务还是已完成任务
 */
function Task(props) {
    const { taskType, checked = '', onCheck, taskList = [] } = props
    const todoList = taskList.filter(function (item) { return item.status === taskType }); //只过滤出当前状态的任务
    return (
        todoList.map((task) => {
            return <div className="item-container" key={task.id}>
                <input type="checkbox" className="item__check" onChange={onCheck.bind(null, 'check', task.id)} checked={checked} />
                <label className="item__text">{task.value}</label>
                <div className="btn btn__del" onClick={onCheck.bind(null, 'delete', task.id)}>DEL</div>
                <div className="task__line"></div>
            </div>
        })
    );
}

class TaskList extends React.Component {
    state = {
        value: '', //当前任务内容
        nextTodoId: 0, //当前任务id
        unfinishedNum: 0, //未完成任务数
        finishedNum: 0, //已完成任务数
        todoList: [] //任务列表
    }

    /**
     * 处理导航栏的输入框内容发生变化
     *  @param {e} 发生点击事件的Event对象
     */
    handleInput = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    /**
     * 添加新任务
     */
    addTask = () => {
        const { value, todoList, nextTodoId, unfinishedNum } = this.state
        if (!value.trim()) return; //不允许添加空白任务

        //创建一个新任务
        const item = {
            value: value, //任务描述
            id: nextTodoId, //任务id，唯一
            status: 'unfinished'  //任务状态，未完成：'unfinished'；已完成：'finished'
        }

        this.setState({
            value: '',
            nextTodoId: nextTodoId + 1,
            unfinishedNum: unfinishedNum + 1,
            todoList: [...todoList, item]
        });
    };

    /**
     * 勾选任务状态或删除任务
     * @param {event}  发生点击事件的Event对象
     */
    alterTask = (taskType, taskId) => {
        var { todoList, unfinishedNum, finishedNum } = this.state;
        var taskIndex = 0;

        todoList.some((item, index) => { //查找
            if (item.id === taskId) {
                taskIndex = index;
                return true;
            }
            return false;
        }
        )

        const status = todoList[taskIndex].status;
        if (taskType === 'check') { //扭转任务状态
            if (status === 'unfinished') { //如果任务是未完成的
                todoList[taskIndex].status = 'finished';
                unfinishedNum--;
                finishedNum++;
            } else { //任务是已完成的
                todoList[taskIndex].status = 'unfinished';
                unfinishedNum++;
                finishedNum--;
            }
        } else if (taskType === 'delete') { //删除任务
            if (status === 'unfinished') unfinishedNum--;
            else finishedNum--;

            todoList.splice(taskIndex, 1);//将任务从列表里面删除
        } else return;

        this.setState({
            finishedNum: finishedNum,
            unfinishedNum: unfinishedNum,
            todoList: todoList,
        })
    };

    render() {
        const { value, todoList, unfinishedNum, finishedNum } = this.state;
        return (
            <div>
                <nav className='nav'>
                    <label className='nav__logo'>TodoList</label>
                    <input className='nav__input' value={value} onChange={this.handleInput} type='text' placeholder='添加任务' />
                    <div className='nav__add-btn' onClick={() => this.addTask()}>添加</div>
                </nav>
                <div className='task-container'>
                    <div className='task task--todo'>
                        <h3>待完成
                            <span className='btn btn__num'>{unfinishedNum}</span>
                        </h3>
                        <div className='task__line task__line--first'></div>
                        <Task
                            taskType='unfinished'
                            onCheck={this.alterTask}
                            taskList={todoList}
                        />
                    </div>
                    <div className='task task--done'>
                        <h3>已完成
                            <span className='btn btn__num'>{finishedNum}</span>
                        </h3>
                        <div className='task__line task__line--first'></div>
                        <Task
                            taskType='finished'
                            checked='checked'
                            onCheck={this.alterTask}
                            taskList={todoList}
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
