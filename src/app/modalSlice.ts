import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpen(state) {
      state.open = true;
    },
    setClose(state) {
      state.open = false;
    },
  },
});
export const { setOpen, setClose } = modalSlice.actions;

export default modalSlice.reducer;
