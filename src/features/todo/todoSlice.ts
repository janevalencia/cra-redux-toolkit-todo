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
            userId: 1
        });
        return res.data;
    }
);

// Async update a todo (not being used because the API is dummy!).
// export const updateTodo = createAsyncThunk(
//     'todo/updateTodo',
//     async ({ id, completed }: { id: number, completed: boolean }) => {
//         const res = await TodoServices.update(id, completed);
//         return res.data;
//     }
// );

// Async delete a todo (not being used because the API is dummy!).
// export const deleteTodo = createAsyncThunk(
//     'todo/deleteTodo',
//     async (id: number) => {
//         await TodoServices.remove(id);
//         return id;
//     }
// );

// Define Todo Slice.
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        updateStatus: (state, action: PayloadAction<{ id: number, completed: boolean }>) => {
            // Update the completed status of the task.
            state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.completed = action.payload.completed
                }
                return todo;
            })
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            // Update the todo state by removing the todo.
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

                // Update error state.
                state.error = null;

                // Set the api data to todo state.
                state.todos = action.payload.todos;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                // Update loading state.
                state.loading = false;

                // Update error message.
                state.error = action.error.message as string;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                // EDGE CASE: Only for this project because the API doesn't return unique ID.
                let newItem = action.payload;
                newItem.id = state.todos.length + 1;

                // Add new todo item.
                state.todos.push(newItem);
            })
            .addCase(createTodo.rejected, (state, action) => {
                console.error(action.error.message);
                state.error = action.error.message as string;
            })
    },
})

// Other code such as selectors can use the imported `RootState` type
export const selectAllTodos = (state: RootState) => state.todo.todos;

// Export the actions.
export const { updateStatus, removeTodo } = todoSlice.actions;

// Export default the reducer for this slice.
export default todoSlice.reducer;