import firebase from 'firebase';

function uploadProfilePicRequest() {
    return {
        type: 'UPLOAD_PROF_PIC_REQUEST'
    }
}

function uploadProfilePicSuccess() {
    return {
        type: 'UPLOAD_PROF_PIC_SUCCESS'
    }
}

function uploadProfilePicFailure() {
    return {
        type: 'UPLOAD_PROF_PIC_FAILURE'
    }
}
export const uploadProfilePic = (file, user) => dispatch => {
    dispatch(uploadProfilePicRequest());
    const storageRef = firebase.storage().ref();
    let profileRef = storageRef.child('images/' + user.uid + '/profilePic');
    profileRef.put(file).then(function(snapshot){
        dispatch(uploadProfilePicSuccess());
    }).catch(err => {
        console.error(err.message);
        dispatch(uploadProfilePicFailure())
    });
}

function getProfilePicRequest() {
    return {
        type: 'GET_PROFILE_PIC_REQUEST',
    }
}

function getProfilePicSuccess(url) {
    return {
        type: 'GET_PROFILE_PIC_SUCCESS',
        payload: url
    }
}

function getProfilePicFailure() {
    return {
        type: 'GET_PROFILE_PIC_FAILURE',
    }
}

export const getProfilePic = (user) => dispatch => {
    dispatch(getProfilePicRequest());
    const storageRef = firebase.storage().ref();
    let profileRef = storageRef.child('images/' + user.uid + '/profilePic');
    profileRef.getDownloadURL().then(function(url) {
        dispatch(getProfilePicSuccess(url));
    }).catch( err => {
        console.error(err.message);
        dispatch(getProfilePicFailure());
    });


}