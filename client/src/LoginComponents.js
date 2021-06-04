import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import MessageModal from './MessageModal.js'

function LoginForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('') ;
  
  const handleSubmit = (event) => {
      event.preventDefault();
      setErrorMessage('');
      const credentials = { email, password };
      let valid = true;

      if(email === "") {
        valid= false
        setErrorMessage({msg: "Please insert email address!", type: 'danger'});
      }

      const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!email.match(mailformat)) {
        valid = false
        setErrorMessage({msg: "Please insert a valid email address!", type: 'danger'});
      }

      if(password === "" || password.length < 6) {
        valid = false
        setErrorMessage({msg: "Please insert a password with at least 6 characters!", type: 'danger'});
      }

      if(valid) {
        props.login(credentials);
      } else {
        props.handleShow();
      }
  };

  return (
    <Form>
      {errorMessage ? <MessageModal setMessage={props.setMessage} handleClose={props.handleClose} message={errorMessage} show={props.show}/> : ''}
      <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={email} onChange={ev => setEmail(ev.target.value)} />
      </Form.Group>
      <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
      </Form.Group>
      <Button onClick={handleSubmit}>Login</Button>
    </Form>)
}

export default LoginForm;