import { createAsyncThunk } from "@reduxjs/toolkit";

import getAll from "../../api/kittiesAPI.js";

export const allKitties = createAsyncThunk(
  "kitties/getAll",
  async ({ page, per_page, sort_by, sort_dir }, thunkApi) => {
    try {
      const { data } = await getAll(page, per_page, sort_by, sort_dir);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
