import React from 'react';
import AddTodo from './todos/view/addTodo.js'
import TodoList from './todos/view/todoList.js';
import './todos/view/index.css';

function TodoApp() {
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

export default TodoApp;