import { Form, Button, Alert, Col } from 'react-bootstrap';
import { useState } from 'react';

function LoginForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('') ;
  
  const handleSubmit = (event) => {
      event.preventDefault();
      setErrorMessage('');
      const credentials = { email, password };
      
      // SOME VALIDATION, ADD MORE!!!
      let valid = true;
      if(email === '' || password === '' || password.length < 6)
          valid = false;
      
      if(valid)
      {
        props.login(credentials);
      }
      else {
        setErrorMessage('Error(s) in the form, please fix it.')
      }
  };

  return (
    <Form>
      {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
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

function LogoutButton(props) {
  return(
    <Col>
      <Button variant="outline-primary" onClick={props.logout}>Logout</Button>
    </Col>
  )
}

export { LoginForm, LogoutButton };