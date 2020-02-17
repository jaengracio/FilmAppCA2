import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class FilmCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      release_date: '',
      film_version: '',
      characters: [],
      newCharacters: []
    };
  }

  // fills the empty array of the characters with character objects
  componentDidMount() {
    axios.get('http://localhost:4000/characters')
    .then((res) => {
      console.log(res);
      this.setState({
        characters: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    });
  }

  /**
  * sets the value for each input field
  */
  handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    var value = (name === 'newCharacters') ? this.getSelected(target.options) : target.value;

    this.setState({
      [name]: value
    });
  };

  /**
  * fills the empty newCharacters array
  * with the choices selected from the multiple select
  * returns the results to handleInputChange
  * so the value is set to the correct input field
  */
  getSelected = options => {
    var newValues = [];

    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        newValues.push(options[i].value);
      }
    }

    return newValues;
  }

  /**
  * creates a new film object
  * redirects user to the index if successful
  * otherewise it logs an error message
  */
  onSubmit = e => {
    e.preventDefault();

    const film = {
      title: this.state.title,
      release_date: this.state.release_date,
      film_version: this.state.film_version,
      characters: this.state.newCharacters
    }

    console.log(film);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.post('http://localhost:4000/films', film)
    .then(res => {
      console.log(res.data);
      this.props.history.push('/films');
    })
    .catch(err => {
      console.log('Cannot add film. Check for any blank input fields.');
      console.log(err);
    });
  };

  render() {
    var characterList = this.state.characters.map(character => <option value={ character._id } key={ character._id }>{ character.name }</option>);

    return (
      <>
      <br/>
      <Row>
        <Col>
          <h3>Add new Film</h3>
          <br/>
          <Form onSubmit={ this.onSubmit }>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                value={ this.state.title }
                onChange={ this.handleInputChange }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type='text'
                placeholder='01 January 2020'
                name='release_date'
                value={ this.state.release_date }
                onChange={ this.handleInputChange }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Film Version</Form.Label>
              <Form.Check
                type='radio'
                label='Animated'
                name='film_version'
                value='Animated'
                checked={ this.state.film_version === 'Animated' }
                onChange={ this.handleInputChange}
              />
              <Form.Check
                type='radio'
                label='Live-Action'
                name='film_version'
                value='Live-Action'
                checked={ this.state.film_version === 'Live-Action' }
                onChange={ this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Characters</Form.Label>
              <Form.Control
                as='select'
                name='newCharacters'
                onChange= { this.handleInputChange }
                multiple={ true }>
                { characterList }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant='primary' type='submit'>Add Film</Button>
              <Button variant='secondary' as={ Link } to={ '/films' }>Cancel</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      </>
    )
  }
}

export default withRouter(FilmCreate);
