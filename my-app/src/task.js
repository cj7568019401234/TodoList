import React from 'react';
import './index.css';

function Task() {
    return (
        <div>
            <nav className='nav'>
                <label className='nav__logo'>ToDoList</label>
                <input className='nav__task' type='text' placeholder='添加任务'></input>
                <div className='nav__add'>添加</div>
            </nav>

            <div class='task'>
                <div class='task--todo'>
                    <h3>待完成
                <span class='task--todo__num'>0</span>
                    </h3>
                    <div class='task__line--first'></div>
                    <div class='task--todo__list'></div>
                </div>

                <div class='task--done'>
                    <h3>已完成
                <span class='task--done__num'>0</span>
                    </h3>
                    <div class='task__line--first'></div>
                    <div class='task--done__list'></div>
                </div>
            </div>

            <footer>
                <p>Copyright © 2020 ToDoList. Posted by : Cj</p>
            </footer>

        </div>
    );
}

export default Task;
