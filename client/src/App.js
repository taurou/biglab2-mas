import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Container } from 'react-bootstrap';

import NavigationBar from './NavbarComponents.js';
import PageComponents from './PageComponents.js';
import LoginForm from './LoginComponents.js';
import MessageModal from './MessageModal.js'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from './API.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      handleShow();
    } catch(err) {
      setMessage({msg: err+"!", type: 'danger'});
      handleShow();
    }
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
  }

  return (
    <Router>
      <Container fluid>
        <NavigationBar logout={doLogOut} login={loggedIn}/>
        {loggedIn ? '' : <Redirect to="/login" />}
        {message && <MessageModal setMessage={setMessage} handleClose={handleClose} message={message} show={show}/> }
        <Switch>
        <Route path="/login" render={() => 
          <>{loggedIn ? <Redirect to="/" /> : <LoginForm login={doLogIn} setMessage={setMessage} handleClose={handleClose} handleShow={handleShow} show={show}/>}</>
        }/>

        <Route path="/" render={() =>
        <>
          {loggedIn ?
              <PageComponents loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
              : <Redirect to="/login" /> }
        </>
        } />
      </Switch>
      
      </Container>
    </Router>
  );
}

export default App;
