import React, { useState } from "react";
import { MdAddTask, MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { add } from "../features/todo/todoSlice";
import { AppDispatch } from "../app/store";

// Props for the Input component.
type InputProps = {
  placeholder: string
}

const Input = ({placeholder} : InputProps) => {
    const [value, setValue] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    
    return (
        <div className="w-full md:w-[50%]">
            <div className="flex flex-row gap-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="py-2 px-4 rounded-lg flex-grow focus:outline-none"
                    placeholder={placeholder}
                />
                <div className="flex flex-row gap-2">
                    <button>
                        <MdAddTask
                            size={25}
                            className="text-white hover:text-green-600"
                            onClick={() => { 
                                dispatch(add(value)); // dispatching actions to reducer.
                                setValue(""); // clear input after successful task add.
                            }}
                        />
                    </button>
                    <button onClick={() => setValue("")}>
                        <MdCancel
                            size={25}
                            className="text-white hover:text-red-600"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Input;
