import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class GroupEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: {
        name: '',
        description: '',
        characters: ''
      },
      characters: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`${process.env.REACT_APP_API_URI}/groups/${ id }`)
    .then((res) => {
      console.log(res);

      this.setState({
        group: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get(`${process.env.REACT_APP_API_URI}/characters`)
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

    console.log(value);

    this.setState(state => {
      let group = state.group;

      group[name] = value;

      return { group };
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
    axios.put(`${process.env.REACT_APP_API_URI}/groups/${id}`, this.state.group)
    .then(res => {
      console.log(res);
      this.props.history.push('/groups');
    })
    .catch(err => console.log(err));
  }

  render() {
    var characterList = this.state.characters.map(character => <option value={ character._id } key={ character._id }>{ character.name }</option>);
    var { group } = this.state;

    return (
      <>
      <br/>
      <Row>
        <Col>
          <h3>Edit Group</h3>
          <br/>
          <Form onSubmit={ this.onSubmit }>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={ group.name }
                onChange={ this.handleInputChange }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='textarea'
                name='description'
                value={ group.description }
                onChange={ this.handleInputChange }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Characters (Multiple choice*)</Form.Label>
              <Form.Control
                as='select'
                name='characters'
                onChange={ this.handleInputChange }
                multiple={ true }>
                  { characterList }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="secondary" as={ Link } to={ `/groups/${ group._id }` }>Cancel</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      </>
    )
  }
}

export default withRouter(GroupEdit);
