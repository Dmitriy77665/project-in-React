import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../redux/tab-users/posts-slice';

const PostsTab = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector((state) => state.post.isLoading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    if (!posts.length && !null && !isLoading && !error) {
      dispatch(fetchPosts(id));
    }
  }, [dispatch, id, posts, isLoading, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts {id}</h1>
      {posts ? (
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default PostsTab;
