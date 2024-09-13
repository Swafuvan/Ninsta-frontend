"use client";

import { createSlice, PayloadAction, createAsyncThunk, } from '@reduxjs/toolkit';
import {RootState} from './store';
import { createUserAccount, userLogin } from '../lib/functions/user/route'; 
import { User } from '@/type/users';


interface UserState {
  email(user: UserState, email: any): unknown;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  email: function (user: UserState, email: any): unknown {
    throw new Error('Function not implemented.');
  },
};

export const createUserAsync = createAsyncThunk(
  'auth/signup',
  async (values: {email: string; password: string ,username:string}) => {
    try {
      const newUser : User|null = await createUserAccount(values);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for user login
export const checkingUserAsync = createAsyncThunk(
  'auth/Login',
  async (values: { email: string; password: string }) => {
    try {
      const userDetail: User = await userLogin(values);
      return userDetail;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    clearUserState(state) {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkingUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkingUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkingUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(createUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action:PayloadAction<User|null>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setUser, clearUser, clearUserState } = userSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserLoading = (state: RootState) => state.auth.isLoading;
export const selectUserError = (state: RootState) => state.auth.error;


