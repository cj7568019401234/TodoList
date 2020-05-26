import React from 'react';
import './index.css';

/**
 * 任务
 * @param {props.onCheck}   绑定函数：扭转状态或删除任务时调用
 * @param {props.checked}   勾选类型：待完成任务不勾选；已完成任务勾选
 * @param {props.taskList}  任务列表：筛选过后的任务，可以直接展示
 */
function Task(props) {
    const { checked = '', onCheck, taskList = [] } = props
    return (
        taskList.map((task) => {
            return <div className="item-container" key={task.id}>
                <input type="checkbox" className="item__check" onChange={onCheck.bind(this, 'check', task.id)} checked={checked} />
                <label className="item__text">{task.value}</label>
                <div className="btn btn__del" onClick={onCheck.bind(this, 'delete', task.id)}>DEL</div>
                <div className="task__line"></div>
            </div>
        })
    );
}

class TaskList extends React.Component {
    state = {
        value: '', //当前任务内容
        nextTodoId: 0, //当前任务id
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
        const { value, todoList, nextTodoId } = this.state
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
            todoList: [...todoList, item]
        });
    };

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
        const { value, todoList } = this.state;
        const unfinishedList = todoList.filter(item => item.status === 'unfinished');   //过滤出未完成的任务
        const finishedList = todoList.filter(item => item.status === 'finished');    //过滤出已完成的任务

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