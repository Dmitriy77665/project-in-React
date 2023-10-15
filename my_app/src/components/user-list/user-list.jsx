import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createNewUser, deleteUser } from '../redux/user-slice'
import { Link } from 'react-router-dom';

import styled from './user-list.module.css'

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [newUser, setNewUser] = useState({ title: '', body: '' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = () => {
    dispatch(createNewUser(newUser));
    setNewUser({ title: '', body: '' });
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

    return (
        <div>
            <h1>User List</h1>
            <div>
              <h2>Create New User</h2>
              <input className={styled.input}
                  type="text" 
                  name="name"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={handleInputChange}
              />
              <input className={styled.input}
                  type="text" 
                  name="username"
                  placeholder="User name"
                  value={newUser.username}
                  onChange={handleInputChange}
              />
              <button onClick={handleCreateUser}>Create Post</button>
            </div>
            <ul className={styled.item}>
                {users.map((user) => (
                    <li className={styled.list} key={user.id}>
                        {user.name} {user.username}
                        <div className={styled.btn}>
                          <Link to={`/user/${user.id}`}><button>Info</button></Link>
                          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

export default UserList;
