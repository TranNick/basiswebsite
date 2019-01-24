import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Nav, NavItem, NavLink, TabContent, TabPane, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'; //stuff u might need
import Dropzone from 'react-dropzone';
import { HashLoader } from 'react-spinners';
import classnames from 'classnames';

import * as userActions from '../actions/userAction';
import * as profileActions from '../actions/profileAction';
import { newPage } from '../actions/simpleAction';

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            profilePic: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
        };
    }

    componentDidMount() {
        if(this.props.userReducer.current_user){
            this.props.getProfilePic(this.props.userReducer.current_user);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userReducer.result !== this.props.userReducer.result){
            switch(this.props.userReducer.result){
                case 'SET_CURRENT_USER_FAILURE':
                    this.props.newPage('/homepage')
                    break;
                case 'SET_CURRENT_USER':
                    this.props.getProfilePic(this.props.userReducer.current_user);
                    break;
                default:
            }
        }
        if(prevProps.profileReducer.result !== this.props.profileReducer.result){
            switch(this.props.profileReducer.result){
                case 'GET_PROFILE_PIC_SUCCESS':
                    this.setState({profilePic: this.props.profileReducer.url});
                    break;
                case 'UPLOAD_PROF_PIC_SUCCESS':
                    this.props.getProfilePic(this.props.userReducer.current_user);
                    break;
                default:
            }
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onDrop(file) {
        this.props.uploadProfPic(file[0], this.props.userReducer.current_user);
    }

    render() {
        if(!!!this.props.userReducer.user_data || this.props.profileReducer.isRequesting){
            return (
                <Container style={{ marginLeft: '50%', marginTop: '15%' }}>
                <HashLoader
                        sizeUnit={"px"}
                        size={75}
                        color={'#36D7B7'}
                        loading={true}
                        />
                </Container>

            );
        } else {
            return(
                <Container fluid={true} style={{marginTop: '20px', marginLeft: '3%'}}>
                    <Row>
                        <Col lg="3">
                            <Card>
                                <div className='dropzone'>
                                    <Dropzone style={{backgroundSize: 'cover'}} onDrop={this.onDrop.bind(this)}>
                                        <CardImg top width="100%" src={this.state.profilePic} alt="Card image cap" /> 
                                    </Dropzone>
                                </div>
                                <CardBody>
                                <CardTitle>{this.props.userReducer.user_data.firstname + ' ' + this.props.userReducer.user_data.lastname}</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="8">
                           <Container fluid={true} >
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                        >
                                        About
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                        >
                                        Friends
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                <br/>
                                                <h4>Tab 1 Contents</h4>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <div>hi</div>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                           </Container>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
    editProfile: (firstname, lastname, email, displayname) => dispatch(userActions.editProfile(firstname, lastname, email, displayname)),
    newPage: (path) => dispatch(newPage(path)),
    uploadProfPic: (file, user) => dispatch(profileActions.uploadProfilePic(file, user)),
    getProfilePic: (user) => dispatch(profileActions.getProfilePic(user)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Profile);