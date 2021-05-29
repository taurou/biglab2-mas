import plus from './plus.png';
import { useState } from 'react';
import FormModal from './Modal.js';

function AddController(props) {
    const [modalShow, setModalShow] = useState(false);

    async function addTask(newTask) {
      await fetch('/api/tasks', {method : 'POST', 
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify(newTask)
      });
     // props.setTask(oldTasks => [...oldTasks, newTask]);
     props.setUpdate(true);

    }

    return (
      <>
        <img className="fixed-right-bottom" src={plus} width="50" height="50" alt="plus" type="button" onClick={() => setModalShow(true)}/>

        <FormModal
          lastId={props.lastId} setLastId={props.setLastId}
          show={modalShow}
          onHide={() => setModalShow(false)}
          isAdding={true}
          addOrEdit={addTask}
        />
      </>
    );
}

export default AddController;
