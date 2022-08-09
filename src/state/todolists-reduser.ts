import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    id: string;
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST';
    title: string;
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE';
    id: string;
    title: string;
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER';
    id: string;
    filter: FilterValuesType;
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (todolistId: string,title: string ): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}





export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let CopyState = [...state]
            return CopyState.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST':
            let newTodoList: TodolistType = {
                id: v1(),
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
