import React from 'react';
import { render, screen } from '@testing-library/react';

// Need the following to test the component with Redux.
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fetchTodos } from '../features/todo/todoSlice';

// The Component we want to test.
import App from '../App';

const axios = require('axios');
const mockStore = configureStore([]);

// Your test cases.
describe('App component', () => {
  it('renders without crashing', async () => {
    let store;

    const initialState = {
      todo: {
        todos: [],
        loading: false,
        error: null
      }
    };

    store = mockStore(initialState);

    // Mock response data
    const mockResponse = {
      todos: [
        { 
          completed: false,
          id: 6,
          todo: 'Todo test 1',
          userId: 39,
        },
        { 
          completed: false,
          id: 7,
          todo: 'Todo test 2',
          userId: 39,
        },
      ],
    };

    // Mock Axios get method to return a resolved Promise with mockResponse
    axios.get.mockResolvedValueOnce(mockResponse);

    // Render the component with Redux store provider
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Dispatch the async action creator fetchTodos
    await store.dispatch(fetchTodos());

    // Check if the component renders the todos
    expect(screen.getByText('Todo test 1')).toBeInTheDocument();
  });
});