import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        <input
            className={error?'error': ''}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}