import React, { useEffect } from 'react';
import { Input, List } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { fetchTodos } from './features/todo/todoSlice';

function App() {
  // Redux-toolkit state data and dispatch action.
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector( (state : RootState) => state.todo);

  // Run side-effect to initialise the todos.
  useEffect(() => {
    dispatch(fetchTodos())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return loading when the todos are still being fetched.
  if (loading) {
    return (
      <div className='p-6 w-full flex flex-col items-center'>
        <p className='text-white'>Loading...</p>
      </div>
    )
  }

  // Return error when there is error found in server.
  if (error) {
    console.error(error);
    return (
      <div className='p-6 w-full'>
        <h1 className='text-2xl text-white'>500: Server Error.</h1>
        <p className='text-white'>Please contact the IT support.</p>
      </div>
    )
  }

  return (
    <div className="p-6 w-full flex flex-col items-center gap-4">
      <List items={todos} />
      <Input placeholder='Add a task ...' />
    </div>
  );
}

export default App;
