import { Row } from 'react-bootstrap';
import { useState } from 'react';

import SideContainer from './SideContainer.js';
import MainContainer from './MainContainer.js';
import dayjs from 'dayjs';
import AddController from './AddController.js';
import { Switch, Route } from 'react-router-dom';

const tasks = [
    {
        id: 1,
        description: "Complete Lab 3",
        important: false,
        deadline: dayjs().add(1, 'hour'),
        privatez: true
    },
    {
        id: 2,
        description: "Buy something",
        important: false,
        deadline: dayjs().add(1, 'day'),
        privatez: false,
    },
    {
        id: 3,
        description: "Read a good book",
        important: true,
        deadline: dayjs().add(3, 'day'),
        privatez: false
    },
    {
        id: 4,
        description: "Gym time",
        important: true,
        deadline: dayjs().add(5, 'day'),
        privatez: true,
    },
];

function PageComponents(props) {

    const [selected, setSelected] = useState("All");
    const [tasksState, setTasksState] = useState([...tasks]);
    const [lastId, setLastId] = useState(4);

    return (
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
            <AddController taskList={tasksState} setTask={setTasksState} lastId={lastId} setLastId={setLastId} />
        </>
    );
}

export default PageComponents;