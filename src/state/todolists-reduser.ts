import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionTypes =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>


export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter} as const
}


export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let CopyState = [...state]
            return CopyState.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST':
            let newTodoList: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [
                ...state,
                newTodoList
            ]
        case 'CHANGE-TODOLIST-TITLE': {
            let CopyState = [...state];
            let todoList = CopyState.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
            }
            return CopyState
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let CopyState = [...state];
            let todoList = CopyState.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter;
            }
            return CopyState
        }

        default:
            throw new Error("I don't understand this type")
    }
}
