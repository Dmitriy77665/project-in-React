import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import store from './components/redux/store';
import PostsList from './components/posts-list/posts-list';
import TodoList from './components/todo-list/todo-list';
import UserList from './components/user-list/user-list';
import UserInfo from './components/pages/user-info';
import AlbumsTab from './components/tab-user/albums-tab'
import TodosTab from './components/tab-user/todos-tab';
import PostsTab from './components/tab-user/posts-tab';

function App() {
   return (
    <Provider store={store}>
      <Router>
        <div>
          <nav className="nav">
            <ul className="item">
              <li>
                <Link to='/posts'>Posts</Link>
              </li>
              <li>
                <Link to="/todos">ToDo</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/posts" element={<PostsList />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:id/*" element={<UserInfo />}>
              <Route path="albums" element={<AlbumsTab />} />
              <Route path="posts" element={<PostsTab />} />
              <Route path="todos" element={<TodosTab />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
