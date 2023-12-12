import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checking: true,
    user: null,
    logged: false,
    config: [],
}


export const userSlice = createSlice(
    {
        name: "auth",
        initialState: initialState,
        reducers: {
            authLoginRedux: (state, action) => {
                const { user } = action.payload;
                state.user = user;
                state.checking = false;
                state.logged = true;
            },
            authConfigLoadedRedux: (state, action) => {
                const { config } = action.payload;
                state.config = config;
            },
            authCheckingFinishRedux: (state, action) => {
                state.checking = false;
            },
            authLogoutRedux: (state, action) => {
                state.checking = false;
                state.user = null;
                state.logged = false;
                state.config = [];
            }
        }
    }
);

export const { authLoginRedux, authConfigLoadedRedux, authCheckingFinishRedux, authLogoutRedux } = userSlice.actions;
export default userSlice.reducer;