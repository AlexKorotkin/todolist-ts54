import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};
export  type TodoListType ={
    id: string
    title: string
    filter: FilterValueType
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string,todolistId:string) => void
    changeFilter: (value: FilterValueType, todolistId:string) => void
    addTask: (title: string, todolistId:string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId:string) => void
    changeTaskTitle: (id: string, newTitle:string, todolistId:string) => void // изменить имя таске
    changeTodolistTitle:(newTitle: string, todolistId: string) => void // изменить имя тудулисту
    removeTodolist:(todolistId: string) => void
    filter: FilterValueType
    id: string
}

export function Todolist(props: PropsType) {


    let onAllClickHandler = () => {
        props.changeFilter('all',props.id)
    };
    let onActiveClickHandler = () => {
        props.changeFilter('active',props.id)
    };
    let onCompletedClickHandler = () => {
        props.changeFilter('completed',props.id)
    };
    let removeTodolist =() => props.removeTodolist(props.id)

    const addTask = (title:string) => {   //обвертка над функцией для добавления Таски
        props.addTask(title,props.id)
    }

    let onChangeTitleTodolist = (newValue:string) => {
        // принимаем новый title для todolist и id тудулиста, где ходим сделать изменение
        props.changeTodolistTitle(newValue, props.id)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTitleTodolist}/><button onClick={removeTodolist}>х</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        let onRemoveHandler = () => props.removeTask(t.id,props.id);
                        let onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        let onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <li className={t.isDone ?'is-done': ''} key={t.id}>
                            <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter': ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
