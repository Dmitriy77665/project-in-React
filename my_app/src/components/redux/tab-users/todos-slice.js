import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async (id) => {
  // eslint-disable-next-line no-useless-catch
try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/todos`
    )
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
})

const todosSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateTodo: (state, action) => {
      const { id, completed } = action.payload
      const index = state.todos.findIndex((todo) => todo.id === id)

      if (index !== -1) {
        state.todos[index].completed = completed
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { updateTodo } = todosSlice.actions
export default todosSlice.reducer
