import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import CharacterIndex from './pages/Characters/Index';
import CharacterShow from './pages/Characters/Show';
import CharacterEdit from './pages/Characters/Edit';
import CharacterCreate from './pages/Characters/Create';
import FilmIndex from './pages/Films/Index';
import FilmShow from './pages/Films/Show';
import FilmEdit from './pages/Films/Edit';
import FilmCreate from './pages/Films/Create';
import GroupIndex from './pages/Groups/Index';
import GroupShow from './pages/Groups/Show';
import GroupEdit from './pages/Groups/Edit';
import GroupCreate from './pages/Groups/Create';
import Home from './pages/Home.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null
    };
  }

  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false : true
    }));
  }

  render() {
    const loggedIn = this.state.loggedIn;

    return (
      <BrowserRouter>
        <Container>
          <MyNavbar loggedIn={ loggedIn } onLogout={  this.authHandler } />
          <Switch>
            <Route exact path='/' component={ Home }/>
            <Route exact path='/films' component={ FilmIndex } />
            <Route exact path='/films/create'>
              { (loggedIn) ? <FilmCreate /> : <Redirect to='/films' /> }
            </Route>
            <Route exact path='/films/:id' component={ FilmShow } />
            <Route exact path='/films/:id/edit' component={ FilmEdit } />
          {/*  <Route exact path='/films/:id/edit'>
            { (loggedIn) ? <FilmEdit /> : <Redirect to='/films' /> }
            </Route> */}

            <Route exact path='/characters' component={ CharacterIndex } />
            <Route exact path='/characters/create'>
              { (loggedIn) ? <CharacterCreate /> : <Redirect to='/characters' /> }
            </Route>
            <Route exact path='/characters/:id'  component={ CharacterShow } />
            <Route exact path='/characters/:id/edit'  component={ CharacterEdit } />
          {/*  <Route exact path='/characters/:id/edit'>
            { (loggedIn) ? <CharacterEdit /> : <Redirect to='/characters' /> }
            </Route> */}

            <Route exact path='/groups' component={ GroupIndex } />
            <Route exact path='/groups/create'>
              { (loggedIn) ? <GroupCreate /> : <Redirect to='/groups' /> }
            </Route>
            <Route exact path='/groups/:id'  component={ GroupShow } />
            <Route exact path='/groups/:id/edit'  component={ GroupEdit } />
          {/*  <Route exact path='/groups/:id/edit'>
            { (loggedIn) ? <GroupEdit /> : <Redirect to='/groups' /> }
            </Route> */}

            <Route exact path='/register' component={ Register } />
            <Route exact path='/login' component={ (props) => <Login { ...props } onLogin={ this.authHandler } /> } />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
