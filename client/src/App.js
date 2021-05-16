import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Container } from 'react-bootstrap';

import NavigationBar from './NavbarComponents.js';
import PageComponents from './PageComponents.js';

import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Container fluid>
        <NavigationBar/>
        <PageComponents />
      </Container>
    </Router>
  );
}

export default App;
