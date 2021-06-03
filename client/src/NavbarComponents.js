import {Navbar, Form, FormControl, Button} from 'react-bootstrap';

function NavigationBar(props) {

    return (
        <Navbar className = "fixed-top" bg="success">
        <Navbar.Brand href="#home">
          <svg className="bi bi-check-all" width="30" height="30" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" 
            clipRule="evenodd"/>
            <path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
          </svg>
          <span className="whitetext">ToDo Manager</span>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <svg className="bi bi-people-circle" width="30" height="30" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
            <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd"/>
          </svg>
          <Button className="whitetext" variant="success" onClick={props.logout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default NavigationBar;