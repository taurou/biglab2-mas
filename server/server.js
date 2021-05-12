'use strict';


const express = require('express');
const morgan = require('morgan')


const PORT = 3001;
const dao = require('./dao'); // module for accessing the DB
const app = express();

app.use(morgan('dev'));
app.use(express.json()); // parse the body in JSON format => populate req.body attributes


app.get('/', (req,res) => res.send('Hello world'));

app.get('/api/tasks', (req, res) => {
    dao.listTasks()
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let task = await dao.getTaskById(id);
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }

});


// app.post('/api/tasks', async (req, res) => {
//     let description = req.body.description;
//     let important = req.body.important;
//     let deadline = req.body.deadline;
//     let privatez = req.body.private;

//     try {
//         await dao.createTask({ description: description , important : important, deadline : deadline, private : privatez });
//         res.end();
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });



app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
