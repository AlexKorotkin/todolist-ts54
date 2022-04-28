import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(title);
            setTitle('')
        }
    };

    let addTask = () => {
        if(title.trim()){
            props.addTask(title.trim());
            setTitle('');
        } else setError('Введите данные')

    };
    let onAllClickHandler = () => {
        props.changeFilter('all')
    };
    let onActiveClickHandler = () => {
        props.changeFilter('active')
    };
    let onCompletedClickHandler = () => {
        props.changeFilter('completed')
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                       className={error?'error': ''}
                        value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        let onRemoveHandler = () => props.removeTask(t.id);
                        let onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> props.changeTaskStatus(t.id, e.currentTarget.checked);

                        return <li className={t.isDone ?'is-done': ''} key={t.id}>
                            <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
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