import {appReducer} from './index'
import {combineReducers} from "redux";
import {authReducer} from "../Auth";
import {tasksReducer, todolistsReducer} from "../TodolistsList";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer
})
