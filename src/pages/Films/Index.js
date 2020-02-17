import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import Film from '../../components/Film.js';

class FilmIndex extends Component {
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
        <Col><h3>Films</h3></Col>
        { (loggedIn)
        ? <Col><Button as={ Link } to={ '/films/create' }>Add</Button></Col>
        : <Col></Col> }
      </Row>
      <br/>
      <Row>
        <Col>
          <Film />
        </Col>
      </Row>
      </>
    );
  }
}

export default withRouter(FilmIndex);
