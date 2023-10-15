import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data;
});


export const createNewTodo = createAsyncThunk('todos/createNewTodo', async (newTodo) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  const data = await response.json();
  return data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
    method: 'DELETE',
  });
  return todoId;
});

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      }
    )
    const data = await response.json()
    return data
  }
)


const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleTodoCompletion: (state, action) => {
      const todoId = action.payload;
      const todoToToggle = state.todos.find((todo) => todo.id === todoId);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
        })
  },
});

export const { toggleTodoCompletion } = todosSlice.actions;

export default todosSlice.reducer;
