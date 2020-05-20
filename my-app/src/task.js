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
    return (
        props.taskList.map(function (task,index) {
             return <div className="task__div" key={index+props.checkType}>
                <input type="checkbox" className="task__check" data-type={props.checkType} checked={props.checked} />
                <label className="task__text">{task}</label>
                <div className="task__delBtn" data-type={props.btnType}>DEL</div>
                <div className="task__line--other"></div>
            </div>
        })
    );
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.inputText = React.createRef();
        this.taskText = React.createRef();
        this.state = {
            todoList: [],
            doneList: []
        }
        this.addTask = this.addTask.bind(this);
        this.alterTask = this.alterTask.bind(this);
    }

    /**
     * 添加新任务
     */
    addTask() {
        const text = this.inputText.current.value;
        if(!text.trim()) return; //不允许添加空白任务

        this.inputText.current.value = ''; //添加任务后清除输入框
        this.setState({
            todoList: this.state.todoList.concat(text)  
        });
    };

    /**
     * 勾选任务状态或删除任务
     * @param {event}  发生点击事件的Event对象
     */
    alterTask(event) {
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
        const { todoList, doneList } = this.state;

        return (
            <div>
                <nav className='nav'>
                    <label className='nav__logo'>ToDoList</label>
                    <input className='nav__task' type='text' placeholder='添加任务' ref={this.inputText} />
                    <div className='nav__add' onClick={() => this.addTask()}>添加</div>
                </nav>
                <div className='task' onClick={this.alterTask}>
                    <div className='task--todo'>
                        <h3>待完成
                            <span className='task--todo__num'>{todoList.length}</span>
                        </h3>
                        <div className='task__line--first'></div>
                        <div className='task--todo__list'>
                            <Task
                                checkType='todo'
                                btnType='del-todo'
                                checked=''
                                taskList={todoList}
                            />
                        </div>
                    </div>
                    <div className='task--done'>
                        <h3>已完成
                <span className='task--done__num'>{doneList.length}</span>
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
