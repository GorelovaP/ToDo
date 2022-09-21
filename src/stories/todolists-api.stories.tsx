import React, {useEffect, useState} from 'react'
import {tasksAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "New Todo"
        todolistAPI.createTodolist(title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '69bbe7ce-0405-4f66-9a53-6dea7c5a61ce';
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2a791339-0173-48b8-a4ea-0e872b48070a'
        let title = "TODOOO"
        let promise = todolistAPI.updateTodolist(todolistId, title)
        promise.then((res) => {
            setState(res.data)
        })

    })

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "9d858782-2998-45de-b942-18a6382af996"
        tasksAPI.getTasks(todolistId).then((res) => {
            setState(res.data.items)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "811035da-9f53-477b-be6f-af766eb6e2ad"
        let title = "Очень важно4"
        tasksAPI.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9d858782-2998-45de-b942-18a6382af996';
        const taskId = "cc5cca32-63b4-4ee8-a42b-a1e51276d2d7"
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9d858782-2998-45de-b942-18a6382af996'
        let taskId = "a3b94a07-2526-4f3e-8e53-083f6944048b"
        let modal = {
            title: "Масло",
            description: null,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null
        }
        let promise = tasksAPI.updateTask(todolistId, taskId, modal)
        promise.then((res) => {
            setState(res.data)
        })

    })

    return <div> {JSON.stringify(state)}</div>
}