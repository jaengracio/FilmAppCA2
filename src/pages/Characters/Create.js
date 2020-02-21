import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class CharacterCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      groups: [],
      newGroup: '',
      films: [],
      newFilms: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URI}/groups`)
    .then(res => {
      console.log(res);
      this.setState({
        groups: res.data,
        // sets the first value in the select
        newGroup: res.data[0]
       })
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get(`${process.env.REACT_APP_API_URI}/films`)
    .then(res => {
      console.log(res);
      this.setState({
        films: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    var value = (name === 'newFilms') ? this.getSelected(target.options) : target.value;

    this.setState({
      [name]: value
    });
  };

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
    e.preventDefault();

    const character = {
      name: this.state.name,
      description: this.state.description,
      group: this.state.newGroup,
      films: this.state.newFilms,
    }

    console.log(character);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.post(`${process.env.REACT_APP_API_URI}/characters`, character)
    .then(res => {
      console.log(res.data);
      this.props.history.push('/characters');
    })
    .catch(err => {
      console.log('Cannot add character. Input fields cannot be blank.');
      console.log(err);
    });
  };

  render() {
    var groupList = this.state.groups.map(group => <option value={ group._id } key={ group._id }>{ group.name }</option>);
    var filmList = this.state.films.map(film => <option value={ film._id } key={ film._id }>{ film.title } - { film.film_version }</option>);

    return (
      <>
      <br/>
      <Row>
        <Col>
          <h3>Add Character</h3>
          <br/>
          <Form onSubmit={ this.onSubmit }>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={ this.state.name }
                onChange={ this.handleInputChange }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='textarea'
                name='description'
                value={ this.state.description }
                onChange={ this.handleInputChange }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Group</Form.Label>
              <Form.Control
                as='select'
                name='newGroup'
                onChange={ this.handleInputChange }
                multiple={ false }>
                  { groupList }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Featured Films (multiple choice*)</Form.Label>
              <Form.Control
                as='select'
                name='newFilms'
                onChange= {this.handleInputChange }
                multiple={ true }>
                  { filmList }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">Add Character</Button>
              <Button variant="secondary" as={ Link } to={ '/characters' }>Cancel</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      </>
    )
  }
}

export default withRouter(CharacterCreate);
