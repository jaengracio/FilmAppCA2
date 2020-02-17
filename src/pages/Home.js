import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Film from '../components/Film.js';
import Character from '../components/Character.js';
import Group from '../components/Group.js';

class Home extends Component {

  render() {
    return (
      <>
      <br/>
      <Row>
        <Col>
          <h3>Films</h3>
          <Film />
          <br/>
          <h3>Characters</h3>
          <Character />
          <br/>
          <h3>Groups</h3>
          <Group />
        </Col>
      </Row>
      </>
    );
  }
}

export default Home;
