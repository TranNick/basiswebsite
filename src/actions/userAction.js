import firebase from "firebase";
import { push } from "react-router-redux";

function signUpRequest() {
    return {
        type: 'SIGN_UP_REQUEST'
    }
}

function signUpSuccess() {
    return {
        type: 'SIGN_UP_SUCCESS'
    }
}

function signUpFailure(err) {
    return {
        type: 'SIGN_UP_FAILURE',
        payload: err.message
    }
}

export const signUp = (user) => dispatch => {
    dispatch(signUpRequest());
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then( () => { //create account
        let curUser = firebase.auth().currentUser;
        curUser.updateProfile({ //update their displayname
            displayName: user.username
        }).then( () => {
            firebase.database().ref('users/' + curUser.uid).set({   //add user info to database
                firstname: (user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)),
                lastname: (user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)),
                email: user.email,
                displayname: user.username
            }, function(err) {
                if(err)
                    dispatch(signUpFailure(err));
                else {
                    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
                        dispatch(signUpSuccess());
                    })
                }
            });
        }).catch( err => {
            dispatch(signUpFailure(err));
        });
    }).catch( err => {
        dispatch(signUpFailure(err));
    })
}

function loginRequest() {
    return {
        type: 'LOGIN_REQUEST'
    }
}

function loginSuccess() {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

function loginFailure(err) {
    return {
        type: 'LOGIN_FAILURE',
        payload: err.message
    }
}

export const login = (email, pass) => dispatch => {
    dispatch(loginRequest());
    firebase.auth().signInWithEmailAndPassword(email, pass).then( () => {
        dispatch(loginSuccess());
    }).catch( err => {
        dispatch(loginFailure(err));
    })
}

function logoutSuccess() {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

function logoutFailure() {
    return {
        type: 'LOGOUT_FAILURE'
    }
}

export const logout = () => dispatch => {
    firebase.auth().signOut().then( () => {
        dispatch(push('/homepage'));
        dispatch(logoutSuccess());
    }).catch( err => {
        console.error(err.message);
        dispatch(logoutFailure());
    })
}

function getUserDataRequest(){
    return {
        type: 'GET_USER_DATA_REQUEST'
    }
}

function getUserDataSuccess(payload){
    return {
        type: 'GET_USER_DATA_SUCCESS',
        payload: payload
    }
}

function getUserDataFailure(){
    return {
        type: 'GET_UESR_DATA_FAILURE'
    }
}

export const getUserData = () => dispatch => {
    dispatch(getUserDataRequest());
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + uid).once('value', function(snapshot){
        dispatch(getUserDataSuccess(snapshot.val()));
    }).catch( err => {
        console.error(err.message);
        dispatch(getUserDataFailure(err.message));
    })
}

function setCurrentUserSuccess(user, user_data){
    return {
        type: 'SET_CURRENT_USER',
        payload: { user, user_data}
    }
}

function setCurrentUserFailure(){
    return {
        type: 'SET_CURRENT_USER_FAILURE'
    }
}

export const setCurrentUser = (user, user_data) => dispatch => {
    if(!user || !user_data){
        dispatch(setCurrentUserFailure());
    } else {
        dispatch(setCurrentUserSuccess(user, user_data));
    }
}

//NICKIPOO
export const editProfile = (firstname, lastname, email, displayname) => {
//     dispatch(editprofilerequest()) //TODO
//     //insert firebase calls for updating user.
//     //might be tricky because displayname and email are stored in the firebase user obj and in the firebase database so u have to change in two places which specific functions
//     dispatch(editprofilesuccess()) //TODO
//     dispatch(editprofilefailure()) //TODO
//     //remember to update the user reducer too so you have to have a case statement for it
}