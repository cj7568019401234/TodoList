import React from 'react';
import './index.css';

/**
 * 任务
 * @param {props.checkTyp}  任务类型：todo为待完成；done为已完成
 * @param {props.btnType}  按钮类型：del-todo为删除待完成任务；del-done为删除已完成任务
 * @param {props.checked}  checkbox类型：待完成任务不勾选；已完成任务勾选
 * @param {props.taskList}  任务列表
 */
function Task(props) {
    const { checkType,checked,btnType,taskList = [], onCheck } = props
    return (
        taskList.map((task,index) => {
             return <div className="task__div wrap box container" key={`${index}${checkType}`}>
                <input type="checkbox" className="task__check" onChange={onCheck.bind('input')} checked={checked} />
                <label className="task__text">{task}</label>
                <div className="task__del-btn" data-type={props.btnType} onClick={onCheck.bind(btnType)}>DEL</div>
                <div className="task__line task__line--other"></div>
            </div>
        })
    );
}

class TaskList extends React.Component {
    state = {
        value: '',
        todoList: [],
        doneList: []
    }

    handleInput = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    /**
     * 添加新任务
     */
    addTask = () => {
        const { value, todoList } = this.state
        if(!value.trim()) return; //不允许添加空白任务

        this.setState({
            value: '',
            todoList: [...todoList, value] 
        });
    };

    /**
     * 勾选任务状态或删除任务
        const text = this.inputText
     * @param {event}  发生点击事件的Event对象
     */
    alterTask = (event) => {
        if (!event.target.dataset.type) return;
        const parent = event.target.parentNode;
        const text = parent.getElementsByClassName("task__text")[0].innerText;

        var todo = this.state.todoList;
        var done = this.state.doneList;
        const type = event.target.dataset.type;

        // 点击按钮
        if (type === 'todo' || type === 'del-todo') { //勾选或删除未完成任务
            const index = this.state.todoList.indexOf(text);
            this.state.todoList.splice(index, 1);
            todo = this.state.todoList
            if (type === 'todo') { //勾选未完成任务，需要把当前任务添加到已完成列表中
                done = this.state.doneList.concat(text);
            }
        } else if (type === 'done' || type === 'del-done') { //勾选或删除已完成任务
            const index = this.state.doneList.indexOf(text);
            this.state.doneList.splice(index, 1);
            done = this.state.doneList
            if (type === 'done') { //勾选已完成任务，需要把当前任务添加到未完成列表中
                todo = this.state.todoList.concat(text);
            }
        } else return;

        this.setState({
            todoList: todo,
            doneList: done
        })
    };

    render() {
        const { value, todoList, doneList } = this.state;

        return (
            <div>
                <nav className='nav'>
                    <label className='nav__logo'>ToDoList</label>
                    <input className='nav__task' value={value} onChange={this.handleInput} type='text' placeholder='添加任务' />
                    <div className='nav__add' onClick={() => this.addTask()}>添加</div>
                </nav>
                <div className='task' onClick={this.alterTask}>
                    <div className='task task--todo'>
                        <h3>待完成
                            <span className='task__num'>{todoList.length}</span>
                        </h3>
                        <div className='task__line--first'></div>
                        <div className='task--todo__list'>
                            <Task
                                checkType='todo'
                                btnType='del-todo'
                                checked=''
                                onCheck={this.alterTask}
                                taskList={todoList}
                            />
                        </div>
                    </div>
                    <div className='task task--done'>
                        <h3>已完成
                            <span className='task__num'>{doneList.length}</span>
                        </h3>
                        <div className='task__line--first'></div>
                        <div className='task--done__list'>
                            <Task
                                checkType='done'
                                btnType='del-done'
                                checked='checked'
                                taskList={doneList}
                            />
                        </div>
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
