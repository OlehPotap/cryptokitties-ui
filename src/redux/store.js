import { configureStore } from "@reduxjs/toolkit";
import KittiesReducer from "./kitties/kitties-slice.js";

export const store = configureStore({
  reducer: {
    kitties: KittiesReducer,
  },
});
