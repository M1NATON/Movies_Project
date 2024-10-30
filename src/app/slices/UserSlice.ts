import { User } from "../../type/userType";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userApi } from "../services/userApi";
import { jwtDecode } from "jwt-decode"

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  token?: string;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem('token') || undefined,
};

// Проверка и восстановление пользователя при загрузке из локального хранилища
const initializeUser = (state: InitialState) => {
  if (state.token) {
    try {
      const decodedUser = jwtDecode<User>(state.token);
      state.user = decodedUser;
      state.isAuthenticated = true;
    } catch (error) {
      console.error("Failed to decode JWT token", error);
      state.token = undefined;
      state.user = null;
    }
  }
};

const slice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = undefined;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      state.user = jwtDecode<User>(action.payload.access_token);
      localStorage.setItem('token', action.payload.access_token);
    });
  },
});

// Инициализация пользователя при загрузке
initializeUser(initialState);

export const { logout, resetUser } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUser = (state: RootState) => state.user.user;
