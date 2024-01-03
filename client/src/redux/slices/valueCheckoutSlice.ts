import { createSlice } from "@reduxjs/toolkit";
const valueCheckout = createSlice({
    name: "ValueCheckout",
    initialState: {
        products: [],
        booking: {},
        coupon:{}
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
                    "Bạn có muốn hủy sản phẩm này không"
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
        deleteValueBooking: (state) => {
            state.booking = {}
        },
        setCoupon:(state,action)=>{
            state.coupon = action.payload
        },
        deleteCoupon:(state)=>{
            state.coupon = {}
        },
    },
});
export const {
    increaseProduct,
    decreaseProduct,
    deleteValueProduct,
    setBooking,
    deleteValueBooking,
    setCoupon,
    deleteCoupon
} = valueCheckout.actions;
export const valueCheckoutReducer = valueCheckout.reducer;
