import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Joke {
  joke: string;
  userPunchline: string;
  punchline: string;
}

interface JokeState {
  joke: string;
  userPunchline: string;
  realPunchline: string;
  feedback: string;
  isLoading: boolean;
  showRealPunchline: boolean;
  error: string;
}

export const fetchJoke = createAsyncThunk("joke/fetchJoke", async () => {
  const response = await axios.get<{ setup: string; punchline: string }>(
    "https://official-joke-api.appspot.com/random_joke"
  );
  return response.data;
});

export const submitPunchline = createAsyncThunk(
  "jokes/submitPunchline",
  async ({ joke, userPunchline, punchline }: Joke) => {
    const response = await axios.post<{ feedback: string }>(
      "/api/jokes/guessThePunchline",
      {
        joke,
        userPunchline,
        punchline,
      }
    );
    return response.data;
  }
);

const initialState: JokeState = {
  joke: "",
  userPunchline: "",
  realPunchline: "",
  feedback: "",
  isLoading: false,
  showRealPunchline: false,
  error: "",
};

const jokesSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {
    setUserPunchline: (state, action: { payload: string }) => {
      state.userPunchline = action.payload;
    },
    resetState: (state) => {
      state.userPunchline = "";
      state.showRealPunchline = false;
      state.feedback = "";
      state.error = "";
    },
    setError: (state, action: { payload: string }) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.joke = action.payload.setup;
        state.realPunchline = action.payload.punchline;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchJoke.rejected, (state) => {
        state.error = "Failed to fetch joke...!";
        state.isLoading = false;
      })
      .addCase(submitPunchline.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitPunchline.fulfilled, (state, action) => {
        state.feedback = action.payload.feedback;
        state.showRealPunchline = true;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(submitPunchline.rejected, (state) => {
        state.error = "Failed to get Feedback...!";
        state.isLoading = false;
      });
  },
});

export const { setUserPunchline, resetState, setError } = jokesSlice.actions;
export default jokesSlice.reducer;
