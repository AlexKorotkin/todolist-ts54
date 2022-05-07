import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(newTitle: string)=> void
}
export function EditableSpan(props: EditableSpanPropsType) {
    let[editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    let activateEditMode = () => {
        setTitle(props.title)
        setEditMode(true)

    }
    let activateViewMode = () =>{
        setEditMode(false);
        props.onChange(title)
        }

    let onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return editMode ? <input
            autoFocus
            value={title}
            onChange={onChangeInputHandler}
            onBlur={activateViewMode}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>


}
// error && <div className={'error-message'}>{error}</div>