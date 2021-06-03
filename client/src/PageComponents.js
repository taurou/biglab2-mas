import { Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import SideContainer from './SideContainer.js';
import MainContainer from './MainContainer.js';
import AddController from './AddController.js';
import { Switch, Route, useLocation } from 'react-router-dom';
import API from './API.js';

function PageComponents(props) {

    const location = useLocation();

    const [selected, setSelected] = useState("All");
    const [tasksState, setTasksState] = useState([]);
    const [update, setUpdate] = useState(true);

    useEffect(() => {
        
        async function showTasksByFilter(url) {
        
            const response = await fetch(url, {
                method : 'GET', 
                headers: { 'Content-Type': 'application/json'},
            })
            const responseJSON = await response.json();
            setTasksState(responseJSON);
            setUpdate(false);
        }

        if(props.loggedIn) {
            if(update===true){
                switch(selected) {
                    case 'All':
                        showTasksByFilter('api/tasks');
                        break;
                    case 'Important':
                        showTasksByFilter('api/tasks/important');
                        break;
                    case 'Private':
                        showTasksByFilter('api/tasks/private');
                        break;
                    case 'Today':
                        showTasksByFilter('api/tasks/today');
                        break;
                    case 'Next 7 Days':
                        showTasksByFilter('api/tasks/nextdays');
                        break;
                    default:
                        showTasksByFilter('api/tasks');
                        break;
                }
            }
        }
    }, [update, selected, props.loggedIn]);

    return (
    <>   
        <Row id="row_1">
            <SideContainer chosen={selected} setSelected={setSelected} />

            <Switch>
                <Route exact path="/Important" >
                    <MainContainer title="Important" actualLink={location.state} setUpdate={setUpdate} setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                </Route>
                <Route exact path="/Today" >
                    <MainContainer title="Today" actualLink={location.state} setUpdate={setUpdate} setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                </Route>
                <Route exact path="/Next7Days" >
                    <MainContainer title="Next 7 Days" actualLink={location.state} setUpdate={setUpdate} setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                </Route>
                <Route exact path="/Private" >
                    <MainContainer title="Private" actualLink={location.state} setUpdate={setUpdate} setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                </Route>
                <Route path={["/All", "/"]}  >
                    <MainContainer title="All" actualLink={location.state} setUpdate={setUpdate} setSelected={setSelected} tasks={tasksState} setTasks={setTasksState} />
                </Route>

            </Switch>
        </Row>
        <AddController setUpdate={setUpdate} taskList={tasksState} setTask={setTasksState} />
    </>
    );
}

export default PageComponents;