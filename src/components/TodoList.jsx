import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  selectAllTodos,
  selectTodoStatus,
} from "../redux/todoSlice";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todolist.todos);
  const todoStatus = useSelector((state) => state.todolist.status);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    if (todoStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);

  const handleAddTodo = async () => {
    if (newTodoTitle) {
      const newTodo = {
        title: newTodoTitle,
        completed: false,
        userId: 1,
      };

      await dispatch(addTodo(newTodo));
      setNewTodoTitle("");
    }
  };

  const handleToggleComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    await dispatch(updateTodo(updatedTodo));
  };

  const handleDeleteTodo = async (todoId) => {
    await dispatch(deleteTodo(todoId));
  };

  if (todoStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (todoStatus === "failed") {
    return <div>Error: Cannot fetch todos</div>;
  }

  return (
    <div>
      <h1>Todos</h1>
      <input
        type='text'
        placeholder='Enter a new todo'
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => handleToggleComplete(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
