import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Row, Col, FormGroup, Label, Button, Input, Form } from 'reactstrap'; //stuff u might need
import firebase from 'firebase';

import * as userActions from '../actions/userAction';
import { newPage } from '../actions/simpleAction';

class Account extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userReducer.result !== this.props.userReducer.result){
            switch(this.props.userReducer.result){
                case 'SET_CURRENT_USER_FAILURE':
                    this.props.newPage('/homepage')
                    break;
                default:
            }
        }
    }

    render() {
        console.log(this.props);  //look at what props is made of. All user data should already be there
        return(
            <div>
                Hello world!
            </div>
        );
    }
    
}

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
    editProfile: (firstname, lastname, email, displayname) => dispatch(userActions.editProfile(firstname, lastname, email, displayname)),
    newPage: (path) => dispatch(newPage(path)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Account);