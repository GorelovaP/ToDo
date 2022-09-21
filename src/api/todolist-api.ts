import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '62d66d69-02d1-48f4-85bd-ecfe61bb9699'
    }
})
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type ResponseTasksType = {
    items: TaskType[],
    totalCount: number,
    error: string
}
export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModalType = {
    title: string
    description: null
    status: number
    priority: number
    startDate: null,
    deadline: null
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, modal: UpdateTaskModalType) {

        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, modal)
    }
}