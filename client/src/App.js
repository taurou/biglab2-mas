import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Container, Row, Alert } from 'react-bootstrap';

import NavigationBar from './NavbarComponents.js';
import PageComponents from './PageComponents.js';
import { LoginForm, LogoutButton } from './LoginComponents';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from './API.js';

function App() {

  // userid = 1
  // email = pippo@myemail.it
  // password = paperino
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  const [message, setMessage] = useState('');

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        await API.getUserInfo();
        setLoggedIn(true);
      } catch(err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user}!`, type: 'success'});
    } catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  }

  return (
    <Router>
      <Container fluid>
        {loggedIn ? <NavigationBar loggedIn={loggedIn}/> : <Redirect to="/login" />}
        {message && <Row>
          <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
        </Row> }
        <Switch>
        <Route path="/login" render={() => 
          <>{loggedIn ? <Redirect to="/" /> : <LoginForm login={doLogIn} />}</>
        }/>

        <Route path="/" render={() =>
        <>
          {loggedIn ?
            <Row>
              <PageComponents loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            </Row>
          : <Redirect to="/login" /> }
        </>
        } />
      </Switch>
      
      </Container>
    </Router>
  );
}

export default App;
