import React from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { updateStatus } from "../features/todo/todoSlice";

const Todo = ({
    id,
    title,
    completed,
}: {
    id: number;
    title: string;
    completed: boolean;
}) => {
    // React-redux dispatch to update the task status.
    const dispatch = useDispatch<AppDispatch>();

    // Toggle the status.
    const toggleStatus = () => {
        // Set payload to be dispatched to redux.
        const payload = {
            id,
            completed: !completed
        }
        dispatch(updateStatus(payload));
    }

    return (
        <div className="flex flex-row items-center gap-2 p-4 my-4 bg-transparen border border-slate-500 rounded-md">
            <button className="text-white" onClick={toggleStatus}>
                {completed ? (
                    <ImCheckboxChecked size={20} />
                ) : (
                    <ImCheckboxUnchecked size={20} />
                )}
            </button>
            <div>
                <p className="flex-grow text-white">{title}</p>
            </div>
        </div>
    );
};

export default Todo;
