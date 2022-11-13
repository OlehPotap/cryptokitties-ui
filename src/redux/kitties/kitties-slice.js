import { createSlice } from "@reduxjs/toolkit";

import { allKitties } from "./kitties-operations.js";

const initialState = {
  kitties: [],
  error: null,
  loading: false,
  SortParams: {
    page: 1,
    per_page: 18,
    sort_by: "id",
    sort_dir: "asc",
  },
};

const KittiesReducer = createSlice({
  name: "kitties",
  initialState,
  reducers: {
    loadMore(state) {
      state.SortParams.page++;
    },

    setSortParams(state, { payload }) {
      if (payload.desc) {
        state.SortParams.sort_dir = "desc";
      } else {
        state.SortParams.sort_dir = "asc";
      }
      state.kitties = [];
      state.SortParams.page = 1;
      state.SortParams.sort_by = payload.sort_by;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allKitties.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(allKitties.fulfilled, (state, { payload }) => {
      state.kitties = [...state.kitties, ...payload.cats];
      state.loading = false;
      state.error = null;
    });
    builder.addCase(allKitties.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
  },
});
export const { loadMore, setSortParams } = KittiesReducer.actions;
export default KittiesReducer.reducer;
