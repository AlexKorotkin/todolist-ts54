import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem:(title: string) => void
}
export function AddItemForm(props:AddItemFormPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem(title);
            setTitle('')
        }
    };

    let addTask = () => {
        if(title.trim()){
            props.addItem(title.trim());
            setTitle('');
        } else setError('Введите данные')

    };
    return <div>
        <TextField
            variant={"outlined"}
            label ={'Введите текст'}
            error={Boolean(error)}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            helperText={error}
        />
        <IconButton onClick={addTask} color={"primary"} >
            <ControlPoint/>
        </IconButton>
    </div>
}