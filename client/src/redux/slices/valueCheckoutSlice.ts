import { createSlice } from "@reduxjs/toolkit";
const valueCheckout = createSlice({
    name: "ValueCheckout",
    initialState: {
        toggleSeat: [],
        products: [],
        booking: {},
        totalPrice: 0,
    },
    reducers: {
        increaseProduct: (state, actions) => {

            const newProduct = actions.payload;
            const exitProductIndex = state.products.findIndex(
                (item) => item.id == newProduct.id
            );
            if (exitProductIndex == -1) {
                state.products.push({ ...newProduct, quantity: 1 });
            } else {
                state.products[exitProductIndex].quantity++;
            }
        },
        decreaseProduct(state: any, action) {
            const currentProduct = state.products.find(
                (item: any) => item.id == action.payload
            );
            currentProduct.quantity--;
            if (currentProduct.quantity < 1) {
                const confirm = window.confirm(
                    "Are you sure you want to decrease"
                );
                confirm
                    ? (state.products = state.products.filter(
                        (item: any) => item.id != action.payload
                    ))
                    : (currentProduct.quantity = 1);
            }

        },
        setBooking: (state, action) => {
            state.booking = action;
        },
        deleteValueProduct: (state) => {
            state.products = [];
        },
        deleteActionTogle: (state) => {
            state.toggleSeat = [];
        },
        deleteTotalPrice: (state) => {
            state.totalPrice = 0
        }
    },
});
export const {
    increaseProduct,
    decreaseProduct,
    deleteValueProduct,
    setBooking,
    setTotalPrice,
    deleteActionTogle,
    deleteTotalPrice
} = valueCheckout.actions;
export const valueCheckoutReducer = valueCheckout.reducer;
