import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: "Task Component",
    component: Task
}
const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task remove")

export const TaskBaseExample = () => {
    return <>
        <Task task={{id: "1", isDone: true, title: "css"}}
              changeTaskStatus={changeTaskStatusCallback}
              todoListID={"TodolistId1"}
              removeTask={removeTaskCallback}
              changeTaskTitle={changeTaskTitleCallback}
        />
        <Task task={{id: "2", isDone: false, title: "js"}}
              changeTaskStatus={changeTaskStatusCallback}
              todoListID={"TodolistId2"}
              removeTask={removeTaskCallback}
              changeTaskTitle={changeTaskTitleCallback}
        />
    </>
}