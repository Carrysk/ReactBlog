/**
 * reducers 
 */
import { CHANGE_LOGIN } from './actionTypes'


const defaultState = {
    isLogin: false,
}

export default function (state = defaultState, action) {
    const { type } = action
    switch (type) {
        case CHANGE_LOGIN:
            let newState = JSON.parse(JSON.stringify(state));
            newState.isLogin = action.isLogin;
            return newState;
        default:
            return state;
    }
}