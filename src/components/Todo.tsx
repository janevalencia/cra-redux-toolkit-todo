import React from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const Todo = ({title, completed} : {title: string, completed: boolean}) => {
  return (
    <div className='flex flex-row items-center gap-2 p-4 my-4 bg-transparen border border-slate-500 rounded-md'>
        <button className='text-white'>
            {completed ? (
                <ImCheckboxChecked size={20} />
            ) : (
                <ImCheckboxUnchecked size={20} />
            )}
        </button>
        <div>
            <p className='flex-grow text-white'>{title}</p>
        </div>
    </div>
  )
}

export default Todo;