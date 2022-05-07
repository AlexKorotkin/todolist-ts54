import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist, TodoListType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = 'all' | 'completed' | 'active';
type TaskStateType = {
    [key:string]: Array<TaskType>
}

function App() {

    let todolistsId1 = v1();
    let todolistsId2 = v1();


    let [todolists, setTodolists] = useState<TodoListType[]>(
        [
            {id: todolistsId1, title: 'What to learn', filter: 'all'},
            {id: todolistsId2, title: 'What to buy', filter: 'all'}
        ]
    );


    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistsId1]: [
            {id: v1(), title: 'HTMLandCSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistsId2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: true}
        ]
        }

    );


    function changeFilter(value: FilterValueType, todolistId: string) {  //функция фильтр all, completed, active
        let todolist = todolists.find(t => t.id === todolistId)
        if(todolist){
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    function addTask(title: string, todolistId:string) {
        let filteredTasks = tasks[todolistId]; // - достали из объекта tasks нужный МАССИВ тасок по id тудулиста
        let NewTask = {id: v1(), title: title, isDone: false}; // создали новую таску
        tasks[todolistId] = [NewTask,...filteredTasks] //ПЕРЕприсвоили значение массива, добавив к массиву по id Тудулиста новую таску NewTask
        setTasks({...tasks}); // перерисовали стейт
    }
    function removeTask(id: string, todolistId:string) { // -- функция удаления task
        let filteredTasks = tasks[todolistId].filter(t => t.id !== id);   // - достали из объекта tasks нужный массив тасок по id тудулиста и отфильтровали по id
        tasks[todolistId] = filteredTasks;   // ПЕРЕприсвоили значение тасок объекта ТД по id.
        setTasks({...tasks});   // перерисовали стейт
    }
    function changeStatus(id: string, isDone: boolean, todolistId:string) {   // - превращает галочку на противоположную в таске
        let filteredTasks = tasks[todolistId]; // - достали из объекта tasks нужный массив тасок по id тудулиста
        let task = filteredTasks.find(t => t.id === id); // нашли из конкретного масссива  таску по id
        if (task) task.isDone = isDone; // изменили ей значение isDone
        setTasks({...tasks}); // перерисовали стейт
    }
    function changeTaskTitle (id: string, newTitle:string, todolistId:string){
        //достаем нужным массивпо тудулисту
        let filteredTasks = tasks[todolistId];
        //находим нужную таску из найденного массива
        let task = filteredTasks.find(t => t.id === id);
        //изменим таску,если она нашлась
        if(task) {
            task.title = newTitle
        }
        //засетаем в стейт копию объекта, чтобы react отреагировал перерисовкой
        setTasks({...tasks})
    }
    function changeTodolistTitle (newTitle: string, todolistId: string){
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist){
            todolist.title = newTitle
        }
        setTodolists([...todolists])
    } // <-- ф-ция изменения имени тудулиста
    function removeTodolist (todolistId:string){
        let filteredTodolists = todolists.filter(td => td.id !== todolistId);
        setTodolists([...filteredTodolists]);
        delete tasks[todolistId];
        setTasks({...tasks})
    }
    function addTodolist(title: string){
        let todolist: TodoListType = {id: v1(), title: title, filter: 'all'}
        setTodolists([todolist,...todolists])
        setTasks({[todolist.id]:[],...tasks})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id]; // предполагаем, что в Тудулист попадут все таски.

                    if (tl.filter === 'completed') { // если в ТЛ нажата кнопка 'completed', то в Тудулист попадут все выполненные таски
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    if (tl.filter === 'active') { // если в ТЛ нажата кнопка 'active', то в Тудулист попадут все невыполненные таски
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false)
                    }

                    return <Todolist title={tl.title}
                                     key={tl.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     changeTaskTitle = {changeTaskTitle}
                                     changeTodolistTitle = {changeTodolistTitle}
                                     removeTodolist = {removeTodolist}
                                     filter={tl.filter}
                                     id={tl.id}
                    />
                })
            }
        </div>
    );
}


export default App;
