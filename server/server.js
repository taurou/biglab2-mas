'use strict';

const express = require('express');
const morgan = require('morgan')

const PORT = 3000;
const dao = require('./dao'); // module for accessing the DB
const app = express();

app.use(morgan('dev'));
app.use(express.json()); // parse the body in JSON format => populate req.body attributes

// we should validation for parameters?

// retrieve all tasks
app.get('/api/tasks', async (req, res) => {

    try {
        let tasks = await dao.listTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
});

// retrieve task with id
app.get('/api/tasks/id/:id', async (req, res) => {

    const id = req.params.id;
    try {
        let task = await dao.getTaskById(id);
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
});

// retrieve important tasks
app.get('/api/tasks/important', async (req, res) => {

    try {
        let tasks = await dao.getImportantTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
});

// retrieve private tasks
app.get('/api/tasks/private', async (req, res) => {

    try {
        let tasks = await dao.getPrivateTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
});

// TODO
// retrieve task with deadline
app.get('/api/tasks/today', async (req, res) => {

    try {
        let task = await dao.getTodayTasks();
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/api/tasks/nextdays', async (req, res) => {

    try {
        let task = await dao.getNextDaysTasks();
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
});

// create a new task
app.post('/api/tasks', async (req, res) => {

    let description = req.body.description;
    let important = req.body.important;
    let deadline = req.body.deadline;
    let privatez = req.body.private;
    let userid = req.body.userid;

    try {
        await dao.createTask({ description: description, important: important, deadline: deadline, private: privatez, userid: userid});
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

// update an existing task
app.put('/api/tasks/id/:id', async (req, res) => {

    let id = req.params.id;
    let description = req.body.description;
    let important = req.body.important === true ? 1 : 0;
    let deadline = req.body.deadline;
    let privatez = req.body.private === true ? 1 : 0;
    let userid = req.body.userid;

    try {
        await dao.updateTask({id: id, description: description, important: important, deadline: deadline, private: privatez, userid: userid});
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

// mark an existing task as complete/uncompleted
app.put('/api/tasks/id/:id/:checked', async (req, res) => {

    let id = req.params.id;
    let checked = req.params.checked;

    try {
        await dao.updateChecked(id, checked);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete an existing task
app.delete('/api/tasks/id/:id', async (req, res) => {

    const id = req.params.id;
    try {
        await dao.deleteTask(id);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
