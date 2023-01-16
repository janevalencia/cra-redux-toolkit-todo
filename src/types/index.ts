export type Todo = {
    id: number,
    todo: string,
    completed: boolean,
    userId: number
}

export type CreateTodo = {
    todo: string,
    completed: boolean,
    userId: number
}