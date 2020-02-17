import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Film extends Component {
  constructor(props){
    super(props);

    this.state = {
      films: []
    };
  }

  componentDidMount(){
    axios.get('http://localhost:4000/films')
    .then(res => {
      console.log(res);
      this.setState({
        films: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
 }

  render() {
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Film Version</th>
          </tr>
        </thead>
        <tbody>
        { this.state.films.map(films =>
          <tr key={ films._id }>
            <td>
              <Link to={ `/films/${ films._id }` }>
                { films.title }
              </Link>
            </td>
            <td>{ films.film_version }</td>
          </tr>
        ) }
        </tbody>
      </Table>
    );
  }
}
