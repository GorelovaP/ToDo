import React, {useState} from "react";
import {TextField} from "@mui/material";

type PropsTypeEditableSpan = {
    title: string;
    onChange:(newValue:string)=>void;
}
export const EditableSpan = (props: PropsTypeEditableSpan) => {

    let [editMode, seteditMode] = useState(false)
    let [value, setValue] = useState(props.title)

    const activeEditMode = () => {
        seteditMode(true)
    }
    const activeVieMode = () => {
        seteditMode(false)
        props.onChange(value);
    }
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }


    return editMode
        ? <TextField variant={"standard"} onChange={onChangeHandler} type="text" value={value}
                 onBlur={activeVieMode} autoFocus/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>

}