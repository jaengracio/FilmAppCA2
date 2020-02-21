import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Group extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URI}/groups`)
    .then(res => {
      console.log(res);
      this.setState({
        groups: res.data
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
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        { this.state.groups.map(groups =>
          <tr key={ groups._id }>
            <td>
              <Link to={ `/groups/${ groups._id }` }>
                { groups.name }
              </Link>
            </td>
            <td>{ groups.description }</td>
          </tr>
        ) }
        </tbody>
      </Table>
    );
  }
}
