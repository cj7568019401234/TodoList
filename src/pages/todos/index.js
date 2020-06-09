import React from 'react';
import { AddTodo, TodoList } from './component/index'
import 'antd/dist/antd.css'

function TodoApp() {
    return (
        <div>
            <AddTodo />
            <TodoList />
            <footer>
                <p>Copyright © 2020 TodoList. Posted by : Cj</p>
            </footer>
        </div>
    );
}

export default TodoApp;