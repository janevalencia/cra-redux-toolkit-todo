import React, { useEffect, useState } from "react";
import { MdAddTask, MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todo/todoSlice";
import { AppDispatch } from "../app/store";

// Props for the Input component.
type InputProps = {
    placeholder: string;
};

const Input = ({ placeholder }: InputProps) => {

    const [value, setValue] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(true);

    // Run effect on the add task button.
    useEffect(() => {
        if (value !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [value]);

    const dispatch = useDispatch<AppDispatch>();

    // Add new todo task, calling reducer.
    const addNew = () => {
        // Dispatch adding new todo object.
        dispatch(createTodo(value))
        .then(res => {
            setValue("");
        })
        .catch(e => {
            console.error(e);
        })
    }

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
                    <button
                        disabled={disabled}
                        onClick={addNew}
                    >
                        <MdAddTask
                            size={25}
                            className="text-white hover:text-green-600"
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
