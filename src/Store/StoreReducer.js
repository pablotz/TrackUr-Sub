const initialStore = {
    user: null
}

const types = {
    authLogin: 'auth - login',
    authLogout: 'auth - logout',
}

const storeReducer = (state, action) => {
    switch(action.type) {
        case types.authLogin:
            return {
                ...state,
                user: action.payload
            }
        case types.authLogout:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export {initialStore, types}
export default storeReducer;
