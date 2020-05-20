import React from 'react';
import './index.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.inputText = React.createRef();

        this.state = {
            todoList: ['hahhaha', 'hahhaha2'],
            doneList: ['hhhhh'],
            // inputText : React.createRef()
        }
        this.addTask = this.addTask.bind(this);
        this.alterTask = this.alterTask.bind(this);
    }

    addTask() {
        const text = this.inputText.current.value;
        let oldList = this.state.todoList;

        // console.log(text);
        console.log('addTask',this.state.todoList);


        this.setState({
            todoList: oldList.push(text)
        });

        // console.log( this.inputText.current.value);

        // const todoList = [];
        // // this.setState({squares: squares});

        // const onTaskNum = document.querySelector('.task--todo__num');// 待完成的任务数量
        // // const todoList = document.querySelector('.task--todo__list');// 待完成的任务列表
        // const inputText = document.querySelector('.nav__task').value.trim();// 去除任务前后的空格
        // if (!inputText.length) return;

        // const childNode = ``;

        // todoList.innerHTML += childNode;
        // onTaskNum.innerText = parseInt(onTaskNum.innerText, 10) + 1;// 添加任务的时候，待完成任务数+1
    };


    alterTask(e) {
        const todoList = document.querySelector('.task--todo__list');// 待完成的任务列表
        const doneList = document.querySelector('.task--done__list');// 已完成的任务列表
        const onTaskNum = document.querySelector('.task--todo__num');// 待完成的任务数量
        const endTaskNum = document.querySelector('.task--done__num');// 已完成的任务数量
        const crrTask = e.target.parentNode;

        // 点击checkbox按钮
        if (e.target.classList.contains('task__check')) {
            if (e.target.checked) { // 已勾选的是已完成任务
                crrTask.dataset.type = 'done';
                todoList.removeChild(crrTask);
                doneList.appendChild(crrTask);
                endTaskNum.innerText = parseInt(endTaskNum.innerText, 10) + 1;
                onTaskNum.innerText = parseInt(onTaskNum.innerText, 10) - 1;
            } else { // 未勾选的是未完成任务
                crrTask.dataset.type = 'todo';
                doneList.removeChild(crrTask);
                todoList.appendChild(crrTask);
                onTaskNum.innerText = parseInt(onTaskNum.innerText, 10) + 1;
                endTaskNum.innerText = parseInt(endTaskNum.innerText, 10) - 1;
            }
        } else if (e.target.classList.contains('task__delBtn')) { // 点击DEL删除按钮
            if (crrTask.dataset.type === 'done') { // 已完成的任务
                doneList.removeChild(crrTask);
                endTaskNum.innerText = parseInt(endTaskNum.innerText, 10) - 1;
            } else { // 是待完成任务
                todoList.removeChild(crrTask);
                onTaskNum.innerText = parseInt(onTaskNum.innerText, 10) - 1;
            }
        }
    };

    render() {
        console.log('render',this.state.todoList);
        var taskList = this.state.todoList;

        return (
            <div>
                <nav className='nav'>
                    <label className='nav__logo'>ToDoList</label>
                    <input className='nav__task' type='text' placeholder='添加任务' ref={this.inputText} />
                    <div className='nav__add' onClick={() => this.addTask()}>添加</div>
                </nav>
                <div className='task' onClick={() => this.alterTask()}>
                    <div className='task--todo'>
                        <h3>待完成
                <span className='task--todo__num'>0</span>
                        </h3>
                        <div className='task__line--first'></div>
                        <div className='task--todo__list'>
                            {
                                taskList.map(function (task) {
                                    return <div className="task__div" data-type="todo">
                                        <input type="checkbox" className="task__check" />
                                        <label className="task__text">{task}</label>
                                        <div className="task__delBtn">DEL</div>
                                        <div className="task__line--other"></div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className='task--done'>
                        <h3>已完成
                <span className='task--done__num'>0</span>
                        </h3>
                        <div className='task__line--first'></div>
                        <div className='task--done__list'></div>
                    </div>
                </div>
                <footer>
                    <p>Copyright © 2020 ToDoList. Posted by : Cj</p>
                </footer>
            </div>
        );
    }
}

export default Task;
