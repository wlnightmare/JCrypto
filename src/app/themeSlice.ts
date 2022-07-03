import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkmode: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkmode = !state.darkmode;
      localStorage.setItem("mode", JSON.stringify(state.darkmode));
      // localStorage.setItem("darkmode", JSON.stringify(state.darkmode));
    },
  },
});
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
