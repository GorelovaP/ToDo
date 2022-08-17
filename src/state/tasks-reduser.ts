import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reduser";

type ActionTypes = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatus>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>


export const removeTaskAC = (todolistId: string, id: string) => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, id: id} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId: todolistId, title: title} as const
}
export const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId: todolistId, id: id, isDone: isDone} as const
}
export const changeTaskTitle = (todolistId: string, id: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId: todolistId, id: id, title: title} as const
}


export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todolistTasks = state[action.todolistId];
            copyState[action.todolistId] = todolistTasks.filter(t => t.id != action.id);
            return copyState
        }

        case 'ADD-TASK': {
            let copyState = {...state}
            let task = {id: v1(), title: action.title, isDone: false};
            let todolistTasks = state[action.todolistId];
            copyState[action.todolistId] = [task, ...todolistTasks];
            return copyState
        }

        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone;
            }
            copyState[action.todolistId] = todolistTasks;
            return copyState
        }

        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.title = action.title;
            }
            copyState[action.todolistId] = todolistTasks;
            return copyState
        }
        case 'ADD-TODOLIST': {
            let copyState = {...state}
            copyState[action.todolistId] = [];
            return copyState
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }


        default:
            throw new Error("I don't understand this type")
    }
}
