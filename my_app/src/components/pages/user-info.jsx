import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationDot, faCircleUser, faClipboard} from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, Link } from 'react-router-dom';

import AlbumsTab from './../tab-user/albums-tab'
import TodosTab from './../tab-user/todos-tab'
import PostsTab from './../tab-user/posts-tab'

import styled from './user-info.module.css'

const UserInfoPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [dataElem, setDataElem] = useState(false);

  useEffect(() => {
    if (!dataElem) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setDataElem(true);
        })
        .catch((error) => console.error('Error :', error));
    }
  }, [dataElem, id]);

  return (
    
    <div>
      <h2>User Info</h2>
      {user ? (
        <ul>
          <li>
            <div><FontAwesomeIcon icon={faEnvelope} /> </div>
            <div className={styled.info}>
                {user.email} 
            </div>
          </li>
          <li>
            <div><FontAwesomeIcon icon={faPhone} /> </div>
            <div className={styled.info}>
                {user.phone} 
            </div>
          </li>
          <li>
            <div><FontAwesomeIcon icon={faLocationDot} /> </div>
            <div className={styled.info}>
                {user.address.street}, 
                {user.address.suite}, 
                {user.address.city}, {user.address.zipcode}
            </div>
          </li>
          <li>
            <div><FontAwesomeIcon icon={faCircleUser} /> </div>
            <div className={styled.info}>
                {user.website} 
            </div>
          </li>
          <li>
            <div><FontAwesomeIcon icon={faClipboard} /> </div>
            <div className={styled.info}>
                {user.company.name}, 
                {user.company.catchPhrase}, 
                {user.company.bs}
            </div>
          </li>
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
      <ul className={styled.nav}>
        <li>
         <Link to={`/user/${id}/albums`}>Albums</Link>
        </li>
        <li>
          <Link to={`/user/${id}/posts`}>Posts</Link>
        </li>
        <li>
          <Link to={`/user/${id}/todos`}>Todos</Link>
        </li>
      </ul>
      <Routes>
        <Route path="albums" element={<AlbumsTab />} />
        <Route path="posts" element={<PostsTab />} />
        <Route path="todos" element={<TodosTab />} />
      </Routes>
    </div>
    
  );
};

export default UserInfoPage;
