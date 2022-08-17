import {
    AddTodolistAC,
    ChangeTodolistFilterAC, RemoveTodolistAC,
    todolistsReducer
} from './todolists-reduser';
import {v1} from 'uuid';
import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {addTaskAC, changeTaskStatus, changeTaskTitle, removeTaskAC, tasksReducer} from "./tasks-reduser";

test('correct task should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TasksStateType =
        {
            [todolistId1]: [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
            [todolistId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "React Book", isDone: true}
            ]
        }

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, "1"))

    expect(endState[todolistId1].length).toBe(1);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1].every(t => t.id != "1")).toBeTruthy();

})

test('correct task should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TasksStateType =
        {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true}
            ],
            [todolistId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "React Book", isDone: true}
            ]
        }

    const endState = tasksReducer(startState, addTaskAC(todolistId1, "PHP"))

    expect(endState[todolistId1][0].title).toBe("PHP");
    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(2);
});

test('correct task should change its stat', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TasksStateType =
        {
            [todolistId1]: [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
            [todolistId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "React Book", isDone: true}
            ]
        }

    const endState = tasksReducer(startState, changeTaskStatus(todolistId1, "1", false))

    expect(endState[todolistId1][0].isDone).toBe(false);

});

test('correct task title should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TasksStateType =
        {
            [todolistId1]: [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
            [todolistId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "React Book", isDone: true}
            ]
        }

    const endState = tasksReducer(startState, changeTaskTitle(todolistId1, "2", "NEWTitle"))

    expect(endState[todolistId1][1].title).toBe("NEWTitle");
});

test('when todolist should be added also should be added tasks', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startStateTasks: TasksStateType =
        {
            [todolistId1]: [
                {id: "1", title: "HTML&CSS", isDone: true},
                {id: "2", title: "JS", isDone: true}
            ],
            [todolistId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "React Book", isDone: true}
            ]
        }

    const endStateTodo = tasksReducer(startStateTasks, AddTodolistAC("NewToDo"))

    const keys = Object.keys(endStateTodo);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endStateTodo[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = RemoveTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


