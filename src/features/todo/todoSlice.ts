import { Todo } from '../../types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// First, create the thunk (allowing us to do async operation such as fetch from API).
export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async () => {
        const res = await fetch(`${process.env.REACT_APP_URL}?limit=3&skip=10`);
        return (await res.json());
    }
)

// Define a type for the slice state.
interface TodoState {
    todos: Todo[],
    loading: boolean,
    error: string | null
}

// Define the initial state using that type.
const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null
}

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
export const { add } = todoSlice.actions;

// Export default the reducer for this slice.
export default todoSlice.reducer;