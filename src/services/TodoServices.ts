import api from "../api";
import { CreateTodo } from "../types";

// Fetch all todos.
const getAll = () => {
    return api.get("?limit=3&skip=5");
};

// Fetch a todo by id.
const get = (id: number) => {
    return api.get(`/${id}`);
};

// Add new todo task.
const create = (todo: CreateTodo) => {
    return api.post("/add", todo)
};

// Update the status of a todo.
const update = (id: number, completed: boolean) => {
    return api.put(`/${id}`, completed);
};

// Remove a todo from list.
const remove = (id: number) => {
    return api.delete(`/${id}`);
};

const TodoServices = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default TodoServices;