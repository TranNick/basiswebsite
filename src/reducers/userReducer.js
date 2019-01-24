import { Record } from 'immutable';
import firebase from "firebase";

const InitialState = Record({
    current_user: null,
    user_data: null,
    result: null,
    error: null
});

export default (state = new InitialState(), action) => {
    switch (action.type) {
        case 'SIGN_UP_FAILURE':
            return state.set('result', action.type)
                        .set('error', action.payload);
        case 'SET_CURRENT_USER':
            return state.set('result', action.type)
                        .set('current_user', action.payload.user)
                        .set('user_data', action.payload.user_data);
        case 'SET_CURRENT_USER_FAILURE':
            return state.set('result', action.type);
        case 'SIGN_UP_SUCCESS':
        case 'LOGIN_SUCCESS':
            let user = firebase.auth().currentUser;
            localStorage.setItem('user', JSON.stringify(user));
            return state.set('result', action.type)
                        .set('current_user', user);
        case 'LOGIN_FAILURE':
            return state.set('result', action.type)
                        .set('error', action.payload);
        case 'LOGOUT_SUCCESS':
            localStorage.clear();
            return state.set('result', action.type)
                        .set('current_user', null)
                        .set('user_data', null);
        case 'GET_USER_DATA_SUCCESS':
            localStorage.setItem('user_data', JSON.stringify(action.payload));
            return state.set('result', action.type)
                        .set('user_data', action.payload);
        default:
            return state
    }
}