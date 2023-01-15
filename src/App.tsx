import React from 'react';
import { Input } from './components';

function App() {
  return (
    <div className="p-6 w-full flex flex-col items-center gap-4">
      <p className='text-white'>List of the tasks</p>
      <Input placeholder='Add a task ...' />
    </div>
  );
}

export default App;
