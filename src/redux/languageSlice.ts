import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang:
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
