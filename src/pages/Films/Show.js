import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class FilmShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      film: {},
      loggedIn: localStorage.getItem('jwtToken') !== null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:4000/films/${ id }`)
    .then((res) => {
      console.log(res);

      this.setState({
        film: res.data
        })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onDelete = () => {
    const { id } =  this.props.match.params;
    console.log(id);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.delete(`http://localhost:4000/films/${ id }`)
    .then((res) => {
      console.log(res);
      this.props.history.push('/films');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const loggedIn = this.state.loggedIn;
    const { film } = this.state;

    return (
      <>
      <br/>
      <Row>
        <Col><h3>{ film.name }</h3></Col>
        { (loggedIn) ?
        <Col>
          <Button as={ Link } to={ `/films/${ film._id }/edit` }>Edit</Button>
          <Button onClick={ this.onDelete } variant="danger">Delete</Button>
        </Col>
        :
        <Col></Col>
        }
      </Row>
      <br/>
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Film Version</th>
                <th>Release Date</th>
                <th>Characters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ film.title }</td>
                <td>{ film.film_version }</td>
                <td>{ film.release_date }</td>
                <td>
                  <ul>
                  { film.characters && film.characters.map(characters =>
                    <li key={ characters._id }>
                      <Link to={ `/characters/${ characters._id }` }>
                        { characters.name }
                      </Link>
                    </li>
                  )}
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col><Button as={ Link } to={ `/films` }>View all films</Button></Col>
      </Row>
      </>
    )
  }
}

export default withRouter(FilmShow);
