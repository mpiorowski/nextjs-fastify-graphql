import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../config/storeConfig";
import { Category } from "./forumTypes";

type ForumSlice = {
  category: Category | null;
};

const initialState: ForumSlice = {
  category: null,
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {},
});

export const {} = forumSlice.actions;

export const getCategory = (state: RootState) => state.forum.category;

export default forumSlice.reducer;
