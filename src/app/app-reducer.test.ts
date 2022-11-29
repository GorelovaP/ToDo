import {appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from './app-reducer'

type InitialStateType = {
    error: null | string,
    status: RequestStatusType,
    isInitialized: boolean
}
let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

    expect(endState.status).toBe('loading');
})

