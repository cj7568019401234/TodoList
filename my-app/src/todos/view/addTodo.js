import React from 'react';
import './index.css';


class Addtodo extends React.Component {

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

    render() {
        const { value } = this.state;

        return (
            <div>
                <nav className='nav'>
                    <label className='nav__logo'>TodoList</label>
                    <input className='nav__input' value={value} onChange={this.handleInput} type='text' placeholder='添加任务' />
                    <div className='nav__add-btn' onClick={() => this.addTask()}>添加</div>
                </nav>
                
                <footer>
                    <p>Copyright © 2020 ToDoList. Posted by : Cj</p>
                </footer>
            </div>
        );
    }
}

export default AddTodo;