import { Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import SideContainer from './SideContainer.js';
import MainContainer from './MainContainer.js';
import AddController from './AddController.js';
import { Switch, Route } from 'react-router-dom';

function PageComponents(props) {

    const [selected, setSelected] = useState("All");
    const [tasksState, setTasksState] = useState('');
    const [lastId, setLastId] = useState(4);

    useEffect(() => {
        async function loadTasks() {
            const response = await fetch('/api/tasks');
            const responseJSON = await response.json();
            setTasksState(responseJSON);
        }
        loadTasks();
    }, []);
    // the side-effect runs once after the initial rendering
    // va bene mettere l'array vuoto?

    
    // if (tasksState === "")
    //     return null;

        return tasksState &&  (
        <>   
            <Row id="row_1">
                <SideContainer chosen={selected} setSelected={setSelected} />

                <Switch>
                    <Route exact path="/Important" >
                        <MainContainer title="Important" setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                    </Route>
                    <Route exact path="/Today" >
                        <MainContainer title="Today" setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                    </Route>
                    <Route exact path="/Next7Days" >
                        <MainContainer title="Next 7 Days" setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                    </Route>
                    <Route exact path="/Private" >
                        <MainContainer title="Private" setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                    </Route>
                    <Route path={["/All", "/"]}  >
                        <MainContainer title="All" setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                    </Route>

                </Switch>
            </Row>
         {/**<AddController taskList={tasksState} setTask={setTasksState} lastId={lastId} setLastId={setLastId} />  */}
        </>
    );
}

export default PageComponents;