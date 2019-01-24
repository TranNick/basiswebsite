import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container,Alert, Row, Col, FormGroup, Label, Button, Input, Form } from 'reactstrap';

import './Register.scss';
import * as userActions from '../actions/userAction';


function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input id={id} {...props}></Input>
      </FormGroup>
    );
  }

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userReducer.result !== this.props.userReducer.result){
            switch(this.props.userReducer.result){
                case 'SIGN_UP_FAILURE':
                    this.setState({error: this.props.userReducer.error});
                    break;
                case 'SIGN_UP_SUCCESS':
                    this.props.history.push('/homepage');
                    break;
                default:
            }
        }
    }
    
    validateForm = () => {
        var username = document.getElementById('username').value;
        var password = document.getElementById('_password').value;
        var email = document.getElementById('_email').value;
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;
        if(username && email && firstname && lastname && password){
            if(/^[a-zA-Z0-9]+$/.test(username)){
                //  eslint-disable-next-line
                if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                    var user = {
                        username: username.toLowerCase(),
                        password: password,
                        email: email.toLowerCase(),
                        firstname: firstname.toLowerCase(),
                        lastname: lastname.toLowerCase()
                    }
                    this.props.signUp(user);
                } else {
                    this.setState({error: 'Please enter a valid email'});
                }
            } else {
                this.setState({error: 'Please enter a valid username'});
            }
        } else {
            this.setState({error: 'Please fill out all fields'});
        }
    }

    submit = (e) => {
        if(e.key === 'Enter')
            this.validateForm();
    }

    render() {
        return(
            <Container fluid={true} style={{ backgroundSize: 'cover', margin: '0px', padding: '0px', minHeight: '100%', height: '100%'}}>
                <Container style={{marginTop: '10%', marginLeft: '40%', }}>
                        <Row>
                            <Col xs={6} md={4} >
                                {this.state.error && (
                                    <Alert color="danger">
                                        {this.state.error}
                                    </Alert>
                                )}
                                <Container style={{backgroundColor: 'rgb(230, 230, 230, 0.4)', padding: '15px'}}>
                                    <Form style={{opacity: '1'}}>
                                        <FieldGroup
                                        id="username"
                                        type="text"
                                        label="Username: "
                                        placeholder="Enter username"
                                        onKeyDown={(e) => this.submit(e)}
                                        />
                                        <FieldGroup
                                        id="_email"
                                        type="email"
                                        label="Email Address: "
                                        placeholder="Enter email"
                                        onKeyDown={(e) => this.submit(e)}
                                        />
                                        <FieldGroup
                                        id="firstname"
                                        type="text"
                                        label="First Name: "
                                        placeholder="Enter first name"
                                        onKeyDown={(e) => this.submit(e)}
                                        />
                                        <FieldGroup
                                        id="lastname"
                                        type="text"
                                        label="Last Name: "
                                        placeholder="Enter last name"
                                        onKeyDown={(e) => this.submit(e)}
                                        />
                                        <FieldGroup id="_password" label="Password: " type="password" placeholder="Enter password" onKeyDown={(e) => this.submit(e)}/>
                                        <Container className='mr-auto text-center' ><Button className='ml-auto p-2' color="primary" style={{padding: '5px'}} onClick={() => {this.validateForm()}}>Sign Up</Button></Container>
                                    </Form>
                                </Container>
                            </Col>
                            <Col xs={6} md={4} />
                            <Col xs={6} md={4} />
                        </Row>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    signUp: (user) => dispatch(userActions.signUp(user)),
    login: (username, pass) => dispatch(userActions.login(username, pass)),
    logout: () => dispatch(userActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);