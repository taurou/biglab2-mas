import trash from './trash.gif';
import pencil from './pencil.gif';
import { useState, useEffect } from 'react';
import {ListGroup, Row, Col, Form, Container} from 'react-bootstrap';
import dayjs from 'dayjs';
import './App.css';
import FormModal from './Modal.js';
import staticTrash from './static-trash.png';
import staticPencil from './static-pencil.png';


function MainContainer(props) {

    async function deleteTask(taskID) {
        await fetch('/api/tasks/id/'+taskID, {method : 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
            }});
        props.setUpdate(true);
    }


    async function editTask(newTask) {
        await fetch('/api/tasks/id/'+newTask.id, {
            method : 'PUT', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newTask)
        })

        props.setUpdate(true);

    }

    async function handleCheckbox(newTask, event) {

        let checkedValue = event.target.checked === true ? 1 : 0;
        let task2 = {id: newTask.id, description: newTask.description, important: newTask.important, deadline: newTask.deadline, private: newTask.private, checked: checkedValue, userid: 1};
        await fetch('/api/tasks/id/'+newTask.id+'/'+checkedValue, {
            method : 'PUT', 
            headers: { 'Content-Type': 'application/json'},
        })
        props.setTasks((ts) => ts.map(                              
            (task) => (newTask.id === task.id ? task2 : task)
        ));
        props.setUpdate(true);
    }

    const { setUpdate, setSelected, actualLink, title } = props;

    useEffect(() => {
        setSelected(title);
        setUpdate(true);
    }, [setUpdate, setSelected, actualLink, title]);

    return (
        <Col>
            <Container id="tasks">
                <h1>{props.title}</h1>

                <ListGroup className="TaskList" variant="flush">
                    {props.tasks.map(t => <TaskRow
                        key={t.id}
                        task={t}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        handleCheckbox={handleCheckbox}
                    />
                    )}
                </ListGroup>
            </Container>
        </Col>
    );
}

function TaskRow(props) {

    return(
        <ListGroup.Item >

            <Row>
                <RowData task={props.task} taskID={props.taskID} handleCheckbox={props.handleCheckbox}/>
                <RowControls task={props.task}
                deleteTask={props.deleteTask}
                editTask={props.editTask}
                />
            </Row>
        </ListGroup.Item>
    );
}

function RowData(props) {

    return (<>
        <Col>
            <Form inline>
                <Form.Check type="checkbox" checked={props.task.checked === 1 ? true : false} id={props.task.id} label = {props.task.description} custom
                className = {props.task.important === 1 ? 'important' : ''} onChange={(event) => {props.handleCheckbox(props.task, event)}}
                />
            </Form>
        </Col> 
        <Col> {(() => {
            if(props.task.private === 1) {
                return (
                <Form.Label className="col text-center">
                    <svg className="bi bi-person-square" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                    </svg>
                </Form.Label>
                )
            }
        })()}
      </Col>
      <Col>
        <Form.Label className="col text-right">{props.task.deadline === null ? '' : formatDeadline(dayjs(props.task.deadline))}</Form.Label>
      </Col>
    </>
    );
}

function RowControls(props) {

    const [modalShow, setModalShow] = useState(false);
    const [isHoveredPencil, setIsHoveredPencil] = useState(false);
    const [isHoveredTrash, setIsHoveredTrash] = useState(false);

    return (
        <Col lg="2">
            <Form.Label className="col text-right">
                <img src={isHoveredPencil? pencil : staticPencil } width="25" height="25" 
                onMouseEnter={() => setIsHoveredPencil(true)}
                onMouseLeave={() => setIsHoveredPencil(false)}
                alt="Pencil"
                onClick={() => {
                    setModalShow(true);
                    }}/>
                    <FormModal
                        task={props.task}
                        setTask={props.setTask}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        addOrEdit={props.editTask}
                    />

                <img src={isHoveredTrash? trash : staticTrash } width="25" height="25" alt="Trash"
                onMouseEnter={() => setIsHoveredTrash(true)}
                onMouseLeave={() => setIsHoveredTrash(false)}
                onClick={() => {props.deleteTask(props.task.id)}}/>
            </Form.Label>
        </Col>
    )
}

function isToday(taskDeadline) {

    const comparisonTemplate = 'YYYY-MM-DD';
    const now = dayjs();
    return taskDeadline && (taskDeadline.format(comparisonTemplate) === now.format(comparisonTemplate));
}

function formatDeadline(taskDeadline) {

    if(isToday(taskDeadline)) {
        return taskDeadline.format('[Today at] HH:mm');
    } else {
        return taskDeadline.format('dddd DD MMMM YYYY [at] HH:mm');
    }
}

export default MainContainer;
