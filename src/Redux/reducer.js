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
        default:
            return state;
    }
};

const addToCart = function (state, action) {
    let cartData = []
    if (state.cartData) {
        cartData = [...state.cartData, action.payload];
    } else {
        cartData = [action.payload];
    }

    let uniqueData = Array.from(new Set(cartData.map(JSON.stringify))).map(JSON.parse);
    return { ...state, cartData: uniqueData }
}