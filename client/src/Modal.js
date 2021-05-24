import { Form, Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Redirect} from 'react-router-dom';

function FormModal(props) {

    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.isAdding ? "Add new task" : "Edit task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TaskForm tasks={props.taskList} task={props.task} addOrEdit={props.addOrEdit}
                      closeModal={props.onHide} isAdding={props.isAdding} />
        </Modal.Body>
      </Modal>
    );
  }

  function TaskForm(props) {

    const [description, setDescription] = useState(props.isAdding ? '' : props.task.description) ; 
    const [important, setImportant] = useState(props.isAdding ? false : props.task.important) ;
    const [privatez, setPrivatez] = useState(props.isAdding ? false : props.task.private) ;
    const [deadline, setDeadline] = useState(props.isAdding ? '' : dayjs(props.task.deadline).format("YYYY-MM-DD")) ;
    const [hour, setHour] = useState(props.isAdding ? '' : dayjs(props.task.deadline).format("HH:mm")) ;
    const [errorMessage, setErrorMessage] = useState('');
    const [concluded, setConcluded] = useState(false);

    const handleForm = (event) => {
        event.preventDefault() ;
        let valid = true;
        if (description=== '') {
          setErrorMessage('Please, write a description');
          valid = false;
        }
        else if (deadline  === '') {
          setErrorMessage('Please, set a deadline');
          valid = false;
        }
        else if (hour === '' ) {
          setErrorMessage('Please, set a hour');
          valid = false;
        }
        else if(dayjs(deadline).isBefore(dayjs(),'day')) {
          setErrorMessage('Date invalid: the date is in the past');
          valid = false;
        } else if(dayjs(deadline+"T"+hour).isBefore(dayjs())) {
          setErrorMessage('Hour invalid: the hour is in the past');
          valid = false;
        }        
          
        if(valid) {

          setConcluded(true);
          setErrorMessage('');
          const task = {id: props.task.id, description: description, important: important, deadline: (deadline+"T"+hour), private: privatez, userid: 1};
          props.addOrEdit(task);
          props.closeModal();
        }      
    }

    return (
    <>
        <Form>
        Description: <Form.Control type='text'  value={description} onChange={(event)=>{setDescription(event.target.value)}} /><br />
        Deadline: <Form.Control type='date' value={deadline} onChange={ev=>setDeadline(ev.target.value)}/><br />
        Hour: <Form.Control type = 'time' value={hour} onChange={ev=>setHour(ev.target.value)}/> <br/>

        <Form.Check type="checkbox" checked={important} id="important" custom onChange={(event)=>{setImportant(event.target.checked)}} label="Important" /><br />
        <Form.Check type="checkbox" checked={privatez} id="private" custom onChange={(event)=>{setPrivatez(event.target.checked)}} label="Private" /><br />
        <span style={{color:'red'}} >{errorMessage}</span>  {/* TODO: spostare style nel css - ingrandire il testo e mettere il colore rosso nel css*/}
        <Modal.Footer>
        <Button onClick={props.closeModal} variant="secondary">Cancel</Button><br/>
        <Button onClick={handleForm}>{props.isAdding ? "Add" : "Edit"}</Button><br/>
        </Modal.Footer>
        
        </Form>
        {concluded ? <Redirect to="/All" />  : "" }
        </>
    );   
}

export default FormModal;