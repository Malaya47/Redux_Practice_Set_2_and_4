import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movieSlice";

export default configureStore({
  reducer: {
    movies: movieReducer,
  },
});
