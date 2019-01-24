import React, { Component } from 'react';
import { connect } from 'react-redux';

class Test extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps.simpleReducer);
    console.log(this.props.simpleReducer.result);
  }

  render() {
    return (
        <div>hellooo</div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 });

 const mapDispatchToProps = dispatch => ({
 });

export default connect(mapStateToProps, mapDispatchToProps)(Test);
