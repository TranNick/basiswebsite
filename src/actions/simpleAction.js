import { push } from "react-router-redux";

function newPageRequest(){
    return {
        type: 'NEW_PAGE'
    };
}

export const newPage = (path) => dispatch => {
    dispatch(newPageRequest());
    dispatch(push(path));
}

function simpleActionRequest(){
    return {
        type: 'SIMPLE_ACTION',
        payload: 'result_of_simple_action'
    }
}

export const simpleAction = () => dispatch => {
    dispatch(simpleActionRequest());
}