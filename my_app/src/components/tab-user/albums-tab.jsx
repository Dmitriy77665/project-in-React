import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAlbums } from "../redux/tab-users/albums-slice";

const AlbumsTab = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.album.albums);
  const isLoading = useSelector((state) => state.album.isLoading);
  const error = useSelector((state) => state.album.error);

  useEffect(() => {
    if (!albums.length && !null && !isLoading && !error) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id, albums, isLoading, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Albums {id}</h1>
      {albums.length === 0 ? (
        <p>No albums found.</p>
      ) : (
        albums.map((album) => (
          <div key={album.id}>
            <p>{album.title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AlbumsTab;
