import { ListGroup, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SideContainer(props) {

  const names = [ "All", "Important", "Today", "Next 7 Days" ,"Private"];

    return   (  
      <Col id="asid" lg={3} md={3}>
          <ListGroup className= "SidebarList" id="sidebar-elements" variant="flush">  
            {names.map(n => <SideElement filterName={n} chosen = {props.chosen} key={n} />)}
          </ListGroup>
      </Col>

    );
}

function SideElement(props){

  const pathname = `/${props.filterName.replaceAll(' ', '')}`;

  return (<Link className={props.chosen === props.filterName ? "row2 disabled-link" : "row2"} to={{pathname: pathname, state: {title: props.filterName}}} >

            <ListGroup.Item id={props.chosen === props.filterName ? "active" : ""} className="row2" key={props.filterName}>
                {props.filterName}
            </ListGroup.Item>
          </Link>
        );
}

export default SideContainer;