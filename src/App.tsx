import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all'| 'completed'| 'active';
function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTMLandCSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    );
    let [filter, setFilter] = useState<FilterValueType>('all')

    function changeFilter(value:FilterValueType){  //функция фильтр all, completed, active
        setFilter(value);
    }

    function addTask(title: string){
        let NewTask = { id: v1(), title: title, isDone: false};
        setTasks([NewTask,...tasks]);
    }

    function removeTask(id: string) { // -- функция удаления task
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeStatus(id:string, isDone: boolean){   // - превращает галочку на противоположную в таске
        let task = tasks.find(t => t.id === id);
        if(task) task.isDone = isDone;
        setTasks([...tasks]);

    }

    let tasksForTodolist = tasks;
    if (filter === 'completed'){
        tasksForTodolist = tasks.filter( t => t.isDone === true)
    }
    if (filter === 'active'){
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }



    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask = {addTask}
                      changeTaskStatus = {changeStatus}
                      filter={filter}
            />
        </div>
    );
}


export default App;
