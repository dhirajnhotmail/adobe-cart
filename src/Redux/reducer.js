export const reducer = (state = 0, action) => {
    switch (action.type) {
        case "FETCH":
            return { ...state, productList: [...action.payload] };
        case "SAVE":
            return { ...state, saveList: [...action.payload] };
        case "SORTTYPE":
            return { ...state, sortType: action.payload };
        case "ADDTOCART":
            return addToCart({ ...state }, action);
        case "UPDATECART":
            return {
                ...state, cartData: action.payload
            };
        case "UPDATEPRICE":
            return { ...state, cartPrice: action.payload };
        case "SORTFILTERSHOW":
            return { ...state, sortFilterShow: { ...action.payload } };
        default:
            return state;
    }
};

const addToCart = function (state, action) {
    let cartData = [];
    if (state.cartData) {
        let existingData = [...state.cartData];
        let foundInCartAt;
        existingData.forEach((item, index) => {
            if (item.name === action.payload.name) {
                foundInCartAt = index;
            }
        });

        if (foundInCartAt >= 0) {
            existingData[foundInCartAt].quantity += 1;
            cartData = [...existingData];
        } else {
            cartData = [...existingData, { ...action.payload }];
        }
    } else {
        cartData = [{ ...action.payload }];
    }

    return { ...state, cartData: cartData };
}