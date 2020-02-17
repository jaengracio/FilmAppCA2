import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import Group from '../../components/Group.js';

class GroupIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null
    };
  }

  render() {
    const loggedIn = this.state.loggedIn;

    return (
      <>
      <br/>
      <Row>
        <Col><h3>Groups</h3></Col>
        { (loggedIn)
        ? <Col><Button as={ Link } to={ '/groups/create' }>Add</Button></Col>
        : <Col></Col> }
      </Row>
      <br/>
      <Row>
        <Col>
          <Group />
        </Col>
      </Row>
      </>
   );
  }
}

export default withRouter(GroupIndex);
