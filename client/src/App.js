import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Container, Row, Modal, Button} from 'react-bootstrap';

import NavigationBar from './NavbarComponents.js';
import PageComponents from './PageComponents.js';
import { LoginForm, LogoutButton } from './LoginComponents';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from './API.js';

// TODO: mettere modal in un componente a parte
// TODO: validate email & pass
// TODO: fare la prova con più user
// TODO: aggiornare il README e aggiungere username e password
// TODO: controllare db user del prof (che abbiao cancellato) per vedere se ha il campo "name"
// TODO: modificare le query dei filtri mettendo anche la condizione dell'user

function App() {

  // userid = 1
  // email = pippo@myemail.it 
  // password = paperino

  // userid = 2
  // email = other@mail.com
  // password = thisisasecret
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
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
        {loggedIn ? <NavigationBar logout={doLogOut}/> : <Redirect to="/login" />}
        {message && <Row>
            <Modal 
            show={show}
            onHide={handleClose} 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton onClick={handleClose}></Modal.Header>
            <Modal.Body className={message.type} onClose={() => setMessage('')} dismissible>
              {message.msg}
            </Modal.Body>
            </Modal>
        </Row> }
        <Switch>
        <Route path="/login" render={() => 
          <>{loggedIn ? <Redirect to="/" /> : <LoginForm login={doLogIn} />}</>
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
