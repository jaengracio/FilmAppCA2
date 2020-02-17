import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import Character from '../../components/Character.js';

class CharacterIndex extends Component {
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
        <Col><h3>Characters</h3></Col>
        { (loggedIn)
        ? <Col><Button as={ Link } to={ '/characters/create' }>Add</Button></Col>
        : <Col></Col> }
      </Row>
      <br/>
      <Row>
        <Col>
          <Character />
        </Col>
      </Row>
      </>
   );
  }
}

export default withRouter(CharacterIndex);
