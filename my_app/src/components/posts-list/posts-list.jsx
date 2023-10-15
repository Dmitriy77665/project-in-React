import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createNewPost, deletePost } from '../redux/posts-slice';
import { useForm } from 'react-hook-form'

import styled from './posts-list.module.css';

function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  const { register, handleSubmit: onSubmit, formState: { errors }, reset} = useForm();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = (data) => {
    dispatch(createNewPost(data));
    reset ({
      title: '',
      body: ''
    })
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };
    if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="posts_list">
      <h1>Posts List</h1>
      <h2>Create New Post</h2>
      <div>
        <form onSubmit={onSubmit(handleCreatePost)}>
          <input
            className={styled.input}
            type="text"
            {...register("title", {
              required: 'This is required', 
              minLength: {
                value: 4, 
                message: 'Min length is 4',
              },
            })}
            placeholder="Title"
          />
          <p>{errors.title?.message}</p>
          <input
            className={styled.input}
            {...register("body", {
              required: 'This is required',
              minLength: {
                value: 4,
                message: 'Min length is 4',
              },
            })}
            placeholder="Body"
          />
          <p>{errors.body?.message}</p>
          <button>Create Post</button>
        </form>
      </div>
      <ul className={styled.item}>
        {posts.map((post) => (
          <li className={styled.list} key={post.id}>
            {post.title} <br /> {post.body}
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;