import { createSlice } from "@reduxjs/toolkit";
const accountSlice = createSlice({
    name: "Account",
    initialState: { activeKeyAccout: null },
    reducers: {
        setActiveKeyAccount: (state, action) => {
            state.activeKeyAccout = action.payload;
        },
    },
});
export const { setActiveKeyAccount } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
