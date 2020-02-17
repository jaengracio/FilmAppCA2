import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class CharacterShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {},
      loggedIn: localStorage.getItem('jwtToken') !== null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:4000/characters/${ id }`)
    .then((res) => {
      console.log(res);

      this.setState({
        character: res.data
        })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onDelete = e => {
    const id =  e.target.value;
    console.log(id);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.delete(`http://localhost:4000/characters/${ id }`)
    .then((res) => {
      console.log(res);
      this.props.history.push('/characters');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const loggedIn = this.state.loggedIn;
    const { character } = this.state;

    return (
      <>
      <br/>
      <Row>
        <Col><h3>{ character.name }</h3></Col>
        { (loggedIn) ?
        <Col>
          <Button as={ Link } to={`/characters/${ character._id }/edit` }>Edit</Button>
          <Button value={this.props.match.params.id} onClick={ this.onDelete } variant="danger">Delete</Button>
        </Col>
        :
        <Col></Col>
        }
      </Row>
      <br/>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Description</th>
            <th>Group</th>
            <th>Featured Films</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ character.description }</td>
            <td>{ character.group }</td>
            <td>
              <ul>
                { character.films && character.films.map(film => (
                <li key={ film._id }>
                    <Link to={ `/films/${ film._id }` }>
                      { film.title } - { film.film_version }
                    </Link>
                </li>
                )) }
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <Col><Button as={ Link } to={ `/characters` }>View all characters</Button></Col>
      </Row>
      </>
    )
  }
}

export default withRouter(CharacterShow);
