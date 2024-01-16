import { createSlice } from "@reduxjs/toolkit";
const authorizationSlice = createSlice({
    name: "Authorization",
    initialState: { isAuth: false, token: null, user: null},
    reducers: {
        setIsAuth: (state) => {
            state.isAuth = true;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLogout: (state)=>{
            state.isAuth = false
            state.user = null
            state.token = null
        }
    },
});
export const { setIsAuth, setToken, setUser, setLogout } = authorizationSlice.actions;
export const authorizationReducer = authorizationSlice.reducer;
