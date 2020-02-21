import React, { Component } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URI}/characters`)
    .then(res => {
      console.log(res);
      this.setState({
        characters: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <CardDeck>
        { this.state.characters.map(characters =>
        <Card border='info' style={{ width: '18rem' }} key={ characters._id }>
          <Card.Body>
            <Link to={ `/characters/${ characters._id }` }>
              <Card.Title>{ characters.name }</Card.Title>
            </Link>
            <Card.Text>{ characters.description }</Card.Text>
          </Card.Body>
        </Card>
        ) }
      </CardDeck>
    );
  }
}
