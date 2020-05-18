(function () {
    const addBtn = document.querySelector('.nav__add');//点击添加任务
    const todoList = document.querySelector('.task--todo__list');//待完成的任务列表
    const doneList = document.querySelector('.task--done__list');//已完成的任务列表
    const onTaskNum = document.querySelector('.task--todo__num');//待完成的任务数量
    const endTaskNum = document.querySelector('.task--done__num');//已完成的任务数量
    const task = document.querySelector('.task');//任务区域，包括待完成任务、已完成任务

    /**
     * 导航栏上的添加按钮添加点击事件
     */
    addBtn.onclick = function () {
        var inputText = document.querySelector('.nav__task').value.trim();//去除任务前后的空格
        if (!inputText.length) return

        var childNode = `<div class="task__div">
        <input type="checkbox" class="task__check">
        <label class="task__text">${inputText}</label>
        <div class="task__delBtn">DEL</div>
        <div class="task__line--other"></div>
        </div>
        `
        todoList.innerHTML += childNode;
        onTaskNum.innerText = parseInt(onTaskNum.innerText) + 1;//添加任务的时候，待完成任务数+1
    }

    /**
     * 设置事件委托
     */
    task.addEventListener('click', function (e) {
        var crrTask = e.target.parentNode;

        //点击checkbox按钮
        if (e.target.nodeName.toLowerCase() === 'input') {
            if (e.target.checked) {//已勾选的是已完成任务
                todoList.removeChild(crrTask);
                doneList.appendChild(crrTask);
                endTaskNum.innerText = parseInt(endTaskNum.innerText) + 1;
                onTaskNum.innerText = parseInt(onTaskNum.innerText) - 1;
            } else {//未勾选的是未完成任务
                doneList.removeChild(crrTask);
                todoList.appendChild(crrTask);
                onTaskNum.innerText = parseInt(onTaskNum.innerText) + 1;
                endTaskNum.innerText = parseInt(endTaskNum.innerText) - 1;
            }
        } else if (e.target.classList.contains('del-button')) {//点击DEL删除按钮
            if (e.target.parentNode.parentNode.classList.contains('doneList')) {//已完成的任务
                doneList.removeChild(crrTask);
                endTaskNum.innerText = parseInt(endTaskNum.innerText) - 1;
            } else {//是待完成任务
                todoList.removeChild(crrTask);
                onTaskNum.innerText = parseInt(onTaskNum.innerText) - 1;
            }
        }
    })
})();
