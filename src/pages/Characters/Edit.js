import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class CharacterEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {
        name: '',
        description: '',
        group: '',
        films: ''
      },
      groups: [],
      films: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`${process.env.REACT_APP_API_URI}/${ id }`)
    .then((res) => {
      console.log(res);

      this.setState({
        character: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get(`${process.env.REACT_APP_API_URI}/groups`)
    .then((res) => {
      console.log(res);

      this.setState({
        groups: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get(`${process.env.REACT_APP_API_URI}/films`)
    .then((res) => {
      console.log(res);

      this.setState({
        films: res.data
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
    var value = (name === 'films') ? this.getSelected(target.options) : target.value;

    console.log(value);

    this.setState(state => {
      let character = state.character;

      character[name] = value;

      return { character };
    })
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
    axios.put(`${process.env.REACT_APP_API_URI}/${id}`, this.state.character)
    .then(res => {
      console.log(res);
      this.props.history.push('/characters');
    })
    .catch(err => console.log(err));
  }

  render() {
    var groupList = this.state.groups.map(group => <option value={ group._id } key={ group._id }>{ group.name }</option>);
    var filmList = this.state.films.map(film => <option value={ film._id } key={ film._id }>{ film.title } - { film.film_version }</option>);
    var { character } = this.state;

    return (
      <>
      <br/>
      <Row>
        <Col>
          <h3>Edit Character</h3>
          <br/>
          <Form onSubmit={ this.onSubmit }>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={ character.name }
                onChange={ this.handleInputChange }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='textarea'
                name='description'
                value={ character.description }
                onChange={ this.handleInputChange }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Group</Form.Label>
              <Form.Control
                as='select'
                name='group'
                onChange={ this.handleInputChange }
                multiple={ false }>
                  { groupList }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Featured Films (Multiple choice*)</Form.Label>
              <Form.Control
                as='select'
                name='films'
                onChange={ this.handleInputChange }
                multiple={ true }>
                  { filmList }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="secondary" as={ Link } to={ `/characters/${ character._id }` }>Cancel</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      </>
    )
  }
}

export default withRouter(CharacterEdit);
