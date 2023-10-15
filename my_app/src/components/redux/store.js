import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts-slice';
import todosReducer from './todo-slice'
import userReducer from './user-slice'
import albumReducer from './tab-users/albums-slice'
import todoReducer from './tab-users/todos-slice'
import postReducer from './tab-users/posts-slice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    todos: todosReducer,
    users: userReducer,
    album: albumReducer,
    todo: todoReducer,
    post: postReducer
  },
})

export default store;