import React from "react";
import { deleteMovie, fetchMovies } from "../features/movieSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();
  const deleteMovieHandler = async (id) => {
    await dispatch(deleteMovie(id));
    dispatch(fetchMovies());
  };
  return (
    <>
      <ul>
        {movies?.map((movie) => (
          <li key={movie._id}>
            {movie.movieTitle} - {movie.director} - {movie.genre}{" "}
            <button>
              <Link to={"/movieForm"} state={{ movie }}>
                Edit
              </Link>
            </button>
            <button onClick={() => deleteMovieHandler(movie._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
