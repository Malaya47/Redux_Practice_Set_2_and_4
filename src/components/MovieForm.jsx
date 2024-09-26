import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie, fetchMovies, editMovie } from "../features/movieSlice";
import { Link, useLocation } from "react-router-dom";

const MovieForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [movieTitle, setMovieTitle] = useState(
    location.state?.movie ? location.state?.movie.movieTitle : ""
  );
  const [movieDirector, setMovieDirector] = useState(
    location.state?.movie ? location.state?.movie.director : ""
  );
  const [movieGenre, setMovieGenre] = useState(
    location.state?.movie ? location.state?.movie.genre : ""
  );

  const movieFormSubmitHandler = async (e) => {
    e.preventDefault();
    const movieData = {
      movieTitle,
      director: movieDirector,
      genre: movieGenre,
    };
    if (location.state?.movie) {
      const updatedMovie = {
        ...location.state.movie,
        movieTitle,
        director: movieDirector,
        genre: movieGenre,
      };
      await dispatch(editMovie(updatedMovie));
      setMovieTitle("");
      setMovieDirector("");
      setMovieGenre("");
      dispatch(fetchMovies());
    } else {
      await dispatch(addMovie(movieData));
      setMovieTitle("");
      setMovieDirector("");
      setMovieGenre("");
      dispatch(fetchMovies());
    }
  };

  return (
    <>
      <h2>Movie Form</h2>
      <form onSubmit={movieFormSubmitHandler}>
        <label htmlFor="movieName">Movie Name</label> <br />
        <input
          onChange={(e) => setMovieTitle(e.target.value)}
          type="text"
          id="movieName"
          value={movieTitle}
          required
        />{" "}
        <br />
        <br />
        <label htmlFor="movieDirector">Director</label> <br />
        <input
          onChange={(e) => setMovieDirector(e.target.value)}
          type="text"
          id="movieDirector"
          value={movieDirector}
          required
        />{" "}
        <br />
        <br />
        <label htmlFor="movieGenre">Genre</label> <br />
        <input
          onChange={(e) => setMovieGenre(e.target.value)}
          type="text"
          id="movieGenre"
          value={movieGenre}
          required
        />{" "}
        <br /> <br />
        <input type="submit" />
      </form>{" "}
      <br />
      <Link to={"/"}>Back to Home</Link>
    </>
  );
};

export default MovieForm;
