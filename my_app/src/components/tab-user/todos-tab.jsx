import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, updateTodo } from '../redux/tab-users/todos-slice';

import styled from './todos-tab.module.css';

const TodosTab = () => {
  const { id } = useParams();
  const todos = useSelector((state) => state.todo.todos);
  const loading = useSelector((state) => state.todo.loading);
  const dispatch = useDispatch();
  const isDataLoaded = useSelector((state) => state.todo.isDataLoaded);
 

  

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchTodos(id));
    }
  }, [dispatch, id, isDataLoaded]);

  function handleUpdateTodo(todoId) {
    const todoToUpdate = todos.find((todo) => todo.id === todoId);

    if (todoToUpdate) {
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      dispatch(updateTodo(updatedTodo));
    }
  }

  return (
    <div>
      <h1>Todos {id}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        todos.map((todo) => (
          <div className={styled.list} key={todo.id}>
            <p className={todo.completed ? styled.completed : ''}>{todo.title}</p>
            <div>
              <input
                className={styled.label}
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleUpdateTodo(todo.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TodosTab;
