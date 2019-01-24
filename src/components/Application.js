import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavigationBar from './NavigationBar';
import * as userActions from '../actions/userAction';
import { newPage } from '../actions/simpleAction';

class Application extends Component {

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));
        let user_data = JSON.parse(localStorage.getItem('user_data'));
        this.props.setCurrentUser(user, user_data);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userReducer.result !== this.props.userReducer.result){
            switch(this.props.userReducer.result){
                case 'SIGN_UP_SUCCESS':
                case 'LOGIN_SUCCESS':
                    this.props.getUserData();
                    break;
                case 'SET_CURRENT_USER':
                case 'GET_USER_DATA_SUCCESS':
                    this.forceUpdate();
                    break;
                default:
            }
        }
    }

    render(){
        return(
            <main>
                <NavigationBar {...this.props} />
            </main>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
    login: (username, pass) => dispatch(userActions.login(username, pass)),
    logout: () => dispatch(userActions.logout()),
    getUserData: () => dispatch(userActions.getUserData()),
    setCurrentUser: (user, user_data) => dispatch(userActions.setCurrentUser(user, user_data)),
    newPage: (path) => dispatch(newPage(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);