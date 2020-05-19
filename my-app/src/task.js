import React from 'react';
import './index.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        this.alterTask = this.alterTask.bind(this);
    }

    addTask() {
        const onTaskNum = document.querySelector('.task--todo__num');// 待完成的任务数量
        const todoList = document.querySelector('.task--todo__list');// 待完成的任务列表
        const inputText = document.querySelector('.nav__task').value.trim();// 去除任务前后的空格
        if (!inputText.length) return;

        const childNode = `<div class="task__div" data-type="todo">
            <input type="checkbox" class="task__check">
            <label class="task__text">${inputText}</label>
            <div class="task__delBtn">DEL</div>
            <div class="task__line--other"></div>
            </div>`;

        todoList.innerHTML += childNode;
        onTaskNum.innerText = parseInt(onTaskNum.innerText, 10) + 1;// 添加任务的时候，待完成任务数+1
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
        return (
            <div>
                <nav className='nav'>
                    <label className='nav__logo'>ToDoList</label>
                    <input className='nav__task' type='text' placeholder='添加任务'></input>
                    <div className='nav__add' onClick={this.addTask} >添加</div>
                </nav>
                <div className='task' onClick={this.alterTask}>
                    <div className='task--todo'>
                        <h3>待完成
                <span className='task--todo__num'>0</span>
                        </h3>
                        <div className='task__line--first'></div>
                        <div className='task--todo__list'></div>
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
