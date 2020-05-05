(function(){
    var addBtn = document.querySelector('#add-btn');//点击添加任务
    var onList = document.querySelector('.on-list');//待完成的任务列表
    var endList = document.querySelector('.end-list');//已完成的任务列表
    var onTaskNum = document.querySelector('.on-task-num');//待完成的任务数量
    var endTaskNum = document.querySelector('.end-task-num');//已完成的任务数量
    var mainDiv = document.querySelector('.main-div');//任务区域，包括待完成任务、已完成任务
    
    /**
     * 添加任务
     */
    function addTask(){
        var inputText = document.querySelector('.input-task').value.replace(/(^\s*)|(\s*$)/g,"");//去除任务前后的空格
        if(inputText.length<=0 ){//如果输入空格就不添加任务
            return
        }
        var checkBox = document.createElement('input');//标记是否完成任务的checkbox
        checkBox.setAttribute('type','checkbox');
        checkBox.classList.add('check','center');

        var textNode = document.createElement('label');//任务文本
        textNode.innerHTML = inputText;
        textNode.classList.add('task-text');
        var button = document.createElement('div');//删除按钮
        button.innerHTML = 'DEL';
        button.classList.add('del-button');

        var line = document.createElement('div');//任务分割线
        line.classList.add('new-line');

        var newTask = document.createElement('div');
        newTask.classList.add('new-task');

        newTask.appendChild(checkBox);
        newTask.appendChild(textNode);
        newTask.appendChild(button);
        newTask.appendChild(line);
        onList.appendChild(newTask);
        onTaskNum.innerHTML = parseInt(onTaskNum.innerHTML) + 1;//添加任务的时候，待完成任务数+1
    }

    addBtn.onclick = function(){//导航栏上的添加按钮添加点击事件
        addTask();
    }

    /**
     * 设置事件委托
     */
    mainDiv.addEventListener('click',function(e){
        // console.log(e)
        var crrTask = e.target.parentNode;

        //点击checkbox按钮
        if(e.target.nodeName.toLowerCase() === 'input'){   
            if(e.target.checked){//已勾选的是已完成任务
                onList.removeChild(crrTask);
                endList.appendChild(crrTask); 
                endTaskNum.innerHTML = parseInt(endTaskNum.innerHTML) + 1; 
                onTaskNum.innerHTML = parseInt(onTaskNum.innerHTML) - 1;  
            }else{//未勾选的是未完成任务
                endList.removeChild(crrTask);
                onList.appendChild(crrTask);
                onTaskNum.innerHTML = parseInt(onTaskNum.innerHTML) + 1; 
                endTaskNum.innerHTML = parseInt(endTaskNum.innerHTML) - 1;
            }
        }else if(e.target.classList.contains('del-button')){//点击DEL删除按钮
            if(e.target.parentNode.parentNode.classList.contains('end-list')){//已完成的任务
                endList.removeChild(crrTask);
                endTaskNum.innerHTML = parseInt(endTaskNum.innerHTML) - 1;  
            }else{//是待完成任务
                onList.removeChild(crrTask);
                onTaskNum.innerHTML = parseInt(onTaskNum.innerHTML) - 1;
            }
        }
    })
})();
