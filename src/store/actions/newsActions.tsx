import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createNews = createAsyncThunk(
  "news/create",
  async (payload: any, thunkAPI) => {
    const response = await axios.post(
      "http://localhost:3001/api/createNews",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
  }
);

const getNewsList = createAsyncThunk("news/get/all", async (thunkAPI) => {
  const response = await axios.get("http://localhost:3001/api/getNewsList");

  if (response.status === 201 || response.status === 200) {
    return response.data;
  }
});

export { createNews, getNewsList };
