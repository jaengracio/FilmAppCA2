import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class GroupShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: {},
      loggedIn: localStorage.getItem('jwtToken') !== null
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
  }

  onDelete = e => {
    const id =  e.target.value;
    console.log(id);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.delete(`${process.env.REACT_APP_API_URI}/groups/${ id }`)
    .then((res) => {
      console.log(res);
      this.props.history.push('/groups');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const loggedIn = this.state.loggedIn;
    const { group } = this.state;

    return (
      <>
      <br/>
      <Row>
        <Col><h3>{ group.name }</h3></Col>
        { (loggedIn) ?
        <Col>
          <Button as={ Link } to={`/groups/${ group._id }/edit` }>Edit</Button>
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
            <th>Name</th>
            <th>Description</th>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ group.name }</td>
            <td>{ group.description }</td>
            <td>
              <ul>
                { group.characters && group.characters.map(character => (
                <li key={ character._id }>
                    <Link to={ `/characters/${ character._id }` }>
                      { character.name }
                    </Link>
                </li>
                )) }
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <Col><Button as={ Link } to={ `/groups` }>View all groups</Button></Col>
      </Row>
      </>
    )
  }
}

export default withRouter(GroupShow);
