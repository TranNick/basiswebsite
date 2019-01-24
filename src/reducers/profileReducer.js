import { Record } from 'immutable';
import firebase from "firebase";

const InitialState = Record({
    result: null,
    url: null,
    isRequesting: true,
});

export default (state = new InitialState(), action) => {
    switch (action.type) {
        case 'UPLOAD_PROF_PIC_SUCCESS':
            return state.set('result', action.type);
        case 'UPLOAD_PROF_PIC_FAILURE':
            return state.set('result', action.type);
        case 'GET_PROFILE_PIC_REQUEST':
            return state.set('result', action.type)
                        .set('isRequesting', true);
        case 'GET_PROFILE_PIC_SUCCESS':
            return state.set('result', action.type)
                        .set('url', action.payload)
                        .set('isRequesting', false);
        case 'GET_PROFILE_PIC_FAILURE':
            return state.set('isRequesting', false)
                        .set('result', action.type);
        default:
            return state
    }
}