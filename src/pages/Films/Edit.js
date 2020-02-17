import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class FilmEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      film: {
        title: '',
        release_date: '',
        film_version: '',
        characters: ''
      },
      characters: []
    };
  }

  componentDidMount(){
    const { id } = this.props.match.params;

    axios.get(`http://localhost:4000/films/${ id }`)
    .then(res => {
      console.log(res);

      this.setState({
        film: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })

    axios.get(`http://localhost:4000/characters`)
    .then((res) => {
      console.log(res);

      this.setState({
        characters: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // handles all input changes
  handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    var value = (name === 'characters') ? this.getSelected(target.options) : target.value;

    // changes the current value of the input fields
    this.setState(state => {
      let film = state.film;

      film[name] = value;

      return { film };
    });
  }

  /**
  * takes in all the films
  * returns the new array of selected films
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

  onSubmit = e => {
    const { id } = this.props.match.params;

    e.preventDefault();

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')

    // the new current state of the film is passed as an argument
    axios.put(`http://localhost:4000/films/${id}`, this.state.film)
    .then(res => {
      console.log(res);
      this.props.history.push('/films');
    })
    .catch(err => console.log(err));
  }

  render() {
    var charactersList = this.state.characters.map(character => <option value={ character._id } key={ character._id }>{ character.name }</option>);
    var { film } = this.state;

    return (
      <>
      <br/>
      <Row>
        <Col>
          <h3>Edit Film</h3>
          <br/>
          <Form onSubmit={ this.onSubmit }>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='title'
                value={ film.title }
                onChange={ this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type='text'
                placeholder='01 January 2020'
                name='release_date'
                value={ film.release_date }
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
                checked={ film.film_version === 'Animated' }
                onChange={ this.handleInputChange}
              />
              <Form.Check
                type='radio'
                label='Live-Action'
                name='film_version'
                value='Live-Action'
                checked={ film.film_version === 'Live-Action' }
                onChange={ this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Characters</Form.Label>
              <Form.Control
                as='select'
                name='characters'
                onChange={ this.handleInputChange }
                multiple={ true }>
                { charactersList }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant='primary' type='submit'>Save</Button>
              <Button variant='secondary' as={ Link } to={ `/films/${ film._id }` }>Cancel</Button>
            </Form.Group>
        </Form>
        </Col>
      </Row>
      </>
   )
  }
}

export default withRouter(FilmEdit);
