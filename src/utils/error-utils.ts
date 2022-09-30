import {Dispatch} from "redux";
import {ActionsAppType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";


export const handleServerNetworkError = (dispatch: Dispatch<ActionsAppType>, error: { message: string }) => {

    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ActionsAppType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}