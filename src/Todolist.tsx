import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    todolistID: string
}

export function Todolist(props: PropsType) {


    let onAllClickHandler = () => {
        props.changeFilter('all',props.todolistID)
    };
    let onActiveClickHandler = () => {
        props.changeFilter('active',props.todolistID)
    };
    let onCompletedClickHandler = () => {
        props.changeFilter('completed',props.todolistID)
    };
    let removeTodolist =() => props.removeTodolist(props.todolistID)

    const addTask = (title:string) => {   //обвертка над функцией для добавления Таски
        props.addTask(title,props.todolistID)
    }

    let onChangeTitleTodolist = (newValue:string) => {
        // принимаем новый title для todolist и id тудулиста, где ходим сделать изменение
        props.changeTodolistTitle(newValue, props.todolistID)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTitleTodolist}/>
                <IconButton onClick={removeTodolist} >
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        let onRemoveHandler = () => props.removeTask(t.id,props.todolistID);
                        let onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
                        let onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue, props.todolistID) // props.id - айди тудулиста
                        }
                        return <div className={t.isDone ?'is-done': ''} key={t.id}>
                            <Checkbox color="primary" onChange={onChangeHandler}  checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onRemoveHandler} >
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"} className={props.filter === 'all' ? 'active-filter': ''} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"}  variant={props.filter === 'active' ? "contained": 'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"}  variant={props.filter === 'completed' ? "contained": 'text'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
