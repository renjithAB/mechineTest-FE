import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    message: "",
    variant: "success",
    status: false,

    newsDetail: [],
    modelStatus: false,
  },
  reducers: {
    resetToast: (state) => {
      state.status = false;
      state.message = "";
      state.variant = "success";
    },
    snackBar: (state, action) => {
      state.status = true;
      state.message = action.payload.message;
      state.variant = action.payload.variant;
    },

    resetModel: (state) => {
      state.modelStatus = false;
    },
    updateNewsDetails: (state, action) => {
      state.modelStatus = true;
      state.newsDetail = action.payload;
    },
  },
});

export const { resetToast, snackBar, resetModel, updateNewsDetails } =
  toastSlice.actions;
export default toastSlice.reducer;
export const toastSelector = (state: any) => state.toast;
