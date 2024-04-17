import React from "react";
import { Todo } from "../types";
import TodoItem  from "./Todo";

type ListProps = {
    items: Todo[]
}

const List = ({items} : ListProps) => {
  return (
    <div className='w-full md:w-[50%]'>
        {items.map((todo, index) => (
            <TodoItem key={todo.id} id={todo.id} title={todo.todo} completed={todo.completed} />
        ))}
    </div>
  );
};

export default List;