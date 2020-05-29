import React from 'react';
import AddTodo from './addTodo.js'
import TodoList from './todoList.js';
import './index.css';

export default ()=> {
    return (
        <div>
            <AddTodo />
            <TodoList />
            <footer>
                <p>Copyright © 2020 ToDoList. Posted by : Cj</p>
            </footer>
        </div>
    );
}