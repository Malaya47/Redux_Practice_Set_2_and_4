import React, { useEffect } from "react";
import MovieList from "./MovieList";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movieSlice";
import { Link } from "react-router-dom";

const MovieView = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies.movies);
  const { status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  if (status === "Pending") {
    return <p>Loading...</p>;
  }

  if (status === "Rejected") {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <h1>Movies</h1>
      <MovieList movies={movies} />

      <Link to={"/movieForm"}>Go to form to add movies</Link>
    </>
  );
};

export default MovieView;
