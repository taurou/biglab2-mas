'use strict';

const express = require('express');
const morgan = require('morgan')
const session = require('express-session'); // session middleware

const passport = require('passport');
const passportLocal = require('passport-local');

const PORT = 3000;
const dao = require('./task-dao'); 
const userDao = require('./user-dao');
const app = express();

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

// initialize and configure passport
passport.use(new passportLocal.Strategy((email, password, done) => {
  // verification callback for authentication
  userDao.getUser(email, password).then(user => {
    if (user)
      done(null, user);
    else
      done(null, false, { message: 'Username or password wrong' });
  }).catch(err => {
    done(err);
  });
}));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}


// initialize and configure HTTP sessions
app.use(session({
  secret: 'this and that and other',
  resave: false,
  saveUninitialized: false
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());


/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

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

// retrieve task with deadline
app.get('/api/tasks/deadline/:deadline', async (req, res) => {
    const deadline = req.params.deadline;
    try {
        let task = await dao.getTaskByDeadline(deadline);
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
});


//retrieve today's tasks
app.get('/api/tasks/today', async (req, res) => {

    try {
        let task = await dao.getTodayTasks();
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
});

//retrieve next week's tasks
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
    let important = req.body.important ;
    let deadline = req.body.deadline;
    let privatez = req.body.private ;
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
