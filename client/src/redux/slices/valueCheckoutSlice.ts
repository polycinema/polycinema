import { createSlice } from "@reduxjs/toolkit";
const valueCheckout = createSlice({
    name: "ValueCheckout",
    initialState: { valueCheckout: [], seatActive: false,products:[] },
    reducers: {
        setValueCheckoutSeat: (state , actions) => {
            state.valueCheckout = state.valueCheckout.concat(actions);
        },
        deleteValueCheckoutSeat: (state) => {
            state.valueCheckout = []
        },
        setSeatActive:(state)=>{
            state.seatActive = true
        },
        setProduct:(state,payload)=>{
            console.log(payload);
            
        }
    },
});
export const { setValueCheckoutSeat,setSeatActive,setProduct ,deleteValueCheckoutSeat} = valueCheckout.actions;
export const valueCheckoutReducer = valueCheckout.reducer;