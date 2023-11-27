import { createSlice } from "@reduxjs/toolkit";
const valueCheckout = createSlice({
    name: "ValueCheckout",
    initialState: {
        valueSeatCheckout: [],
        toggleSeat: [],
        products: [],
        booking: {},
        totalPrice:0,
    },
    reducers: {
        setValueCheckoutSeat: (state, actions) => {
            state.valueSeatCheckout.length > 7
                ? alert("Bạn chỉ được chọn 8 ghế")

                : (state.valueSeatCheckout =
                    state.valueSeatCheckout.concat(actions));
        },
        removeValueCheckoutSeat: (state, action) => {
            state.valueSeatCheckout = state.valueSeatCheckout.filter(
                (item) => item.payload.id !== action.payload
            );
        },
        deleteValueCheckoutSeat: (state) => {
            state.valueSeatCheckout = [];
        },
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
        setToggle: (state, action) => {
            const result = action.payload;
            state.toggleSeat = result;
        },
        setActionToggle: (state, action) => {
            if (state.valueSeatCheckout.length > 7) {
                alert("Bạn chỉ được chọn 8 ghế");
            } else {
                const newSeatStates = [...(state.toggleSeat || [])];
                newSeatStates[action.payload] = !newSeatStates[action.payload];
                state.toggleSeat = newSeatStates;
            }
        },
        setTotalPrice:(state)=>{
            const totalProduct = state.products.reduce((sum: any, item: any) => {
                return sum + item.price * item.quantity;
              }, 0) 
            const totalSeat = state.valueSeatCheckout.reduce(
                      (sum, seat) => sum + seat.payload.price,
                      0
                    )
                
            state.totalPrice = totalSeat + totalProduct
            
            
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
    setValueCheckoutSeat,
    increaseProduct,
    decreaseProduct,
    deleteValueCheckoutSeat,
    deleteValueProduct,
    setBooking,
    removeValueCheckoutSeat,
    setToggle,
    setActionToggle,
    setTotalPrice,
    deleteActionTogle,
    deleteTotalPrice
} = valueCheckout.actions;
export const valueCheckoutReducer = valueCheckout.reducer;
