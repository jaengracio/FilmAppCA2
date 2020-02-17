import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class GroupCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      characters: [],
      newCharacters: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/characters`)
    .then(res => {
      console.log(res);
      this.setState({
        characters: res.data
       })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    var value = (name === 'newCharacters') ? this.getSelected(target.options) : target.value;

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

    const group = {
      name: this.state.name,
      description: this.state.description,
      group: this.state.newCharacters
    }

    console.log(group);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.post('http://localhost:4000/groups', group)
    .then(res => {
      console.log(res.data);
      this.props.history.push('/groups');
    })
    .catch(err => {
      console.log('Cannot add group. Input fields cannot be blank.');
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
          <h3>Add Group</h3>
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
              <Form.Label>Characters (multiple choice*)</Form.Label>
              <Form.Control
                as='select'
                name='newCharacters'
                onChange= {this.handleInputChange }
                multiple={ true }>
                  { characterList }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">Add Group</Button>
              <Button variant="secondary" as={ Link } to={ '/groups' }>Cancel</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      </>
    )
  }
}

export default withRouter(GroupCreate);
