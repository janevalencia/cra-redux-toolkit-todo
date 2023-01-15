import { Todo } from '../../types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// First, create the thunk (allowing us to do async operation such as fetch from API).
const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async () => {
        try {
            const res = await fetch(`${process.env.BASE_API_URL}?limit=5&skip=10`);
            return (await res.json());
        } catch (err) {
            return (err as Error).message;
        }
    }
)

// Define a type for the slice state.
interface TodoState {
    todos: Todo[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null
}

// Define the initial state using that type.
const initialState: TodoState = {
    todos: [],
    loading: 'idle',
    error: null
}

// Define Todo Slice.
export const todoSlice = createSlice({
    name: 'todo',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        add: (state, action: PayloadAction<string>) => {
            // Add the newly created todo to the State.
            state.todos.push({
                todo: action.payload,
                completed: false
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                // Update loading state.
                state.loading = 'pending';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                // Update loading state.
                state.loading = 'succeeded';

                // Add the item into state todo list.
                state.todos = state.todos.concat(action.payload);
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                // Update loading state.
                state.loading = 'failed';

                // Update error.
                state.error =  action.error.message as string;
            })
    },
})

// Other code such as selectors can use the imported `RootState` type
export const selectAllTodos = (state: RootState) => state.todo.todos;

// Export the actions.
export const { add } = todoSlice.actions;

// Export default the reducer for this slice.
export default todoSlice.reducer;