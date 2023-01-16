import { Todo } from '../../types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import TodoServices from '../../services/TodoServices'

// Define the initial state using that type.
const initialState: {
    todos: Todo[],
    loading: boolean,
    error: string | null
} = {
    todos: [],
    loading: false,
    error: null
}

// Create the thunks (allowing us to do async operation such as fetch from API).
// Async get all todos.
export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async () => {
        const res = await TodoServices.getAll();
        return res.data;
    }
)

// Async create new todo.
export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async (task: string) => {
        const res = await TodoServices.create({
            todo: task,
            completed: false,
            userId: 5
        });
        return res.data;
    }
);

// Async update a todo.
export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async ({ id, completed }: { id: number, completed: boolean }) => {
        const res = await TodoServices.update(id, completed);
        return res.data;
    }
);

// Async delete a todo.
export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (id: number) => {
        await TodoServices.remove(id);
        return id;
    }
);

// Define Todo Slice.
const todoSlice = createSlice({
    name: 'todo',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        add: (state, action: PayloadAction<string>) => {
            // Add the newly created todo to the State.
            state.todos.push({
                id: 1,
                todo: action.payload,
                completed: false,
                userId: 5
            })
        },
        updateStatus: (state, action: PayloadAction<{ id: number, completed: boolean }>) => {
            // Update the completed status of the task.
            state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.completed = action.payload.completed
                }
                return todo;
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                // Update loading state.
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                // Update loading state.
                state.loading = false;

                // Set the api data to todo state.
                state.todos = action.payload.todos;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                // Update loading state.
                state.loading = false;

                // Update error message.
                state.error = action.error.message as string;
            })
    },
})

// Other code such as selectors can use the imported `RootState` type
export const selectAllTodos = (state: RootState) => state.todo.todos;

// Export the actions.
export const { add, updateStatus } = todoSlice.actions;

// Export default the reducer for this slice.
export default todoSlice.reducer;