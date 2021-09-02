import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UiState {
  error: {
    message: string;
  };
  user: {
    loggedIn: boolean;
    info?: { [keys: string]: any };
  };
}

const initialState: UiState = {
  error: {
    message: "",
  },
  user: {
    loggedIn: false,
    info: {
      username: null,
    },
  },
};

export const UiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.error.message = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.user.info = action.payload;
    },
    login: (state) => {
      state.user.loggedIn = true;
    },
    logout: (state) => {
      state.user.loggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage, setUserInfo, login, logout } = UiSlice.actions;

export default UiSlice.reducer;
