
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createNewTodo, deleteTodo, updateTodo, toggleTodoCompletion } from '../redux/todo-slice';


import styled from './todo-list.module.css';

function TodoList() {
  
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  const [newTodo, setNewTodo] = useState({ title: '', completed: false });
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleCreateTodo = () => {
    dispatch(createNewTodo(newTodo));
    setNewTodo({ title: '', completed: false });
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const handleToggleTodo = (todoId) => {
    dispatch(toggleTodoCompletion(todoId));
  };
  const handleEditTodo = (todoId) => {
  const todoToEdit = todos.find((todo) => todo.id === todoId);
  if (todoToEdit) {
    setEditingTodo(todoToEdit);
  }
  };
  const handleEditInputChange = (event) => {
  const { name, value } = event.target;
  setEditingTodo({ ...editingTodo, [name]: value });
};

const handleSaveTodo = () => {
  dispatch(updateTodo(editingTodo));
  setEditingTodo(null);
};

const cancelEdit = () => {
  setEditingTodo(null);
};
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  <div>
    <h1>ToDo list</h1>
    <div>
      <h2>Create new ToDo</h2>
      <input
        className={styled.input}
        type="text"
        name="title"
        placeholder="Title"
        value={newTodo.title}
        onChange={handleInputChange}
      />
      <button className={styled.button} onClick={handleCreateTodo}>
        Create ToDo
      </button>
    </div>
    {editingTodo && (
      <div>
        <h2>Edit ToDo</h2>
        <input
          className={styled.input}
          type="text"
          name="title"
          placeholder="Title"
          value={editingTodo.title}
          onChange={handleEditInputChange}
        />
        <button className={styled.button} onClick={handleSaveTodo}>
          Save
        </button>
        <button className={styled.button} onClick={cancelEdit}>
          Cancel
        </button>
      </div>
    )}
    <ul className={styled.item}>
      {todos.map((todo) => (
        <li className={styled.list} key={todo.id}>
          {todo.title}
          <div className={styled.buttons}>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button onClick={() => handleToggleTodo(todo.id)}>
              {todo.completed ? 'Not done' : 'Done'}
            </button>
            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

}

export default TodoList;
