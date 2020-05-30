import React from 'react';
import { AddTodo, TodoList } from './component/index'

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