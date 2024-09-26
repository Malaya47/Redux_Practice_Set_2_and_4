import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(
    `https://reduxtoolkit-movies-backend.vercel.app/movies`
  );
  return response.data;
});

export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  const response = await axios.delete(
    `https://reduxtoolkit-movies-backend.vercel.app/movies/movie/${id}`
  );
  return response.data;
});

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData) => {
    const response = await axios.post(
      `https://reduxtoolkit-movies-backend.vercel.app/movies`,
      movieData
    );
    return response.data;
  }
);

export const editMovie = createAsyncThunk(
  "movie/editMovie",
  async (updatedMovie) => {
    const response = await axios.put(
      `https://reduxtoolkit-movies-backend.vercel.app/movies/movie/${updatedMovie._id}`,
      updatedMovie
    );
    return response.data;
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = "Movies fetched successfully";
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.status = "Pending";
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.status = "Rejected";
      state.error = action.error.message;
    });
  },
});

// export const {} = movieSlice.actions
export default movieSlice.reducer;
