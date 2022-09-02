import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType;
    todoListID: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todoListID), [props.removeTask, props.task.id, props.todoListID])


    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todoListID);
    }, [props.changeTaskStatus, props.task.id, props.todoListID])


    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListID);
    }, [props.task.id, props.changeTaskTitle, props.todoListID])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})