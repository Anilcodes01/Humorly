import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Meme {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    nsfw: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    preview: string[];
  }
  
  export interface MemeState {
    memes: Meme[];
    loading: boolean;
    error: string | null;
  }

const initialState: MemeState = {
  memes: [],
  loading: false,
  error: null,
};

export const fetchMemes = createAsyncThunk(
  'meme/fetchMemes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/memes');
      return response.data.meme.memes; // Accessing the memes array from the response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Failed to fetch memes');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const memeSlice = createSlice({
  name: 'meme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = action.payload;
        state.error = null;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default memeSlice.reducer;