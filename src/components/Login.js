import React, { Component } from 'react';
import { Input, Form, Alert, FormGroup, Label, Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input id={id} {...props}></Input>
      </FormGroup>
    );
  }

export default class LoginModal extends Component {

    userLogin = () => {
        this.props.login(document.getElementById('email').value.toLowerCase(), document.getElementById('password').value);
    }

    submit = (e) => {
        if(e.key === 'Enter')
            this.userLogin();
    }

    render() {
        if(this.props.show){
            return(
                <div>
                    <Modal isOpen={true}>
                        <ModalHeader>Login</ModalHeader>
                        {(this.props.userReducer.result === 'LOGIN_FAILURE') && (
                            <Alert color="danger">
                                {this.props.userReducer.error}
                            </Alert> 
                        )}
                        <ModalBody>
                            <Form>
                                <FieldGroup
                                id="email"
                                type="email"
                                label="Email:"
                                placeholder="Enter email"
                                onKeyDown={(e) => this.submit(e)}
                                />
                                <FieldGroup id="password" label="Password" type="password" placeholder="Enter password" onKeyDown={(e) => this.submit(e)}/>
                            </Form>               
                        </ModalBody>
                        <ModalFooter>
                            <a href={'/register'} className='mr-auto'><font size={1}>Need an account? Register here</font></a>
                            <Button onClick={this.props.close} type={'submit'}>Cancel</Button>
                            <Button color="primary" onClick={() => {this.userLogin()}}>Login</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        } 
        return null;
    }
}