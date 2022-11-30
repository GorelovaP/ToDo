import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const fetchTodolistsTC = createAsyncThunk("todolists/fetchTodo",
    async (param, {dispatch, rejectWithValue}) => {

        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        try {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolists: res.data}
        } catch (err) {
            const error: AxiosError = err as AxiosError
            dispatch(setAppStatusAC({status: 'succeeded'}))
            handleServerNetworkError(error, dispatch);
            return rejectWithValue({})
        }
    })
export const removeTodolistTC = createAsyncThunk("todolists/removeTodo",
    async (param: { todolistId: string }, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: 'loading'}))
            await todolistsAPI.deleteTodolist(param.todolistId)
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id: param.todolistId}
        } catch (err) {
            const error: AxiosError = err as AxiosError
            dispatch(setAppStatusAC({status: 'succeeded'}))
            handleServerNetworkError(error, dispatch);
            return rejectWithValue({})
        }
    })

export const addTodolistTC = createAsyncThunk("todolists/addTodo",
    async (param: { title: string }, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            const res = await todolistsAPI.createTodolist(param.title)
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}

        } catch (err) {
            const error: AxiosError = err as AxiosError
            dispatch(setAppStatusAC({status: 'succeeded'}))
            handleServerNetworkError(error, dispatch);
            return rejectWithValue({})
        }
    })
export const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle",
    async (param: { id: string, title: string }, {dispatch, rejectWithValue}) => {
        try {
            await todolistsAPI.updateTodolist(param.id, param.title)
            return {id: param.id, title: param.title}

        } catch (err) {
            const error: AxiosError = err as AxiosError
            dispatch(setAppStatusAC({status: 'succeeded'}))
            handleServerNetworkError(error, dispatch);
            return rejectWithValue({})
        }
    })

const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },

    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})
export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
} = slice.actions
export const todolistsReducer = slice.reducer

// type
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

