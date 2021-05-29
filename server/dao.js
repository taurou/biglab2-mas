'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('tasks.db', (err) => {
  if(err) throw err;
});

// get all tasks
exports.listTasks = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks ORDER BY DATETIME(deadline)';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked , userid : t.userid }));
      resolve(tasks);
    });
  });
};


// get important tasks
exports.getImportantTasks = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE important = 1 ORDER BY DATETIME(deadline)';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked , userid : t.userid }));
      resolve(tasks);
    });
  });
};

// get private tasks
exports.getPrivateTasks = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE private = 1 ORDER BY DATETIME(deadline)';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked, userid: t.userid }));
      resolve(tasks);
    });
  });
};

exports.getTaskByDeadline = (deadline) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE deadline=? ORDER BY DATETIME(deadline)';
    db.get(sql, [deadline], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        reject({error: 'Deadline not found.'});
      } else {
        const task = { id : row.id, description: row.description, important: row.important, deadline : row.deadline, private: row.private, checked: row.checked, userid: row.userid };
        resolve(task);
      }
    });
  });
};

exports.getNextDaysTasks = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE DATE(deadline) > DATE("now") AND DATE(deadline) <= DATE("now","+7 days") ORDER BY DATETIME(deadline)';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked, userid: t.userid }));
      resolve(tasks);      
    });
  });
};

exports.getTodayTasks = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE DATE(deadline) = DATE("now") ORDER BY DATETIME(deadline)';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked, userid: t.userid }));
      resolve(tasks); 
    });
  });
};

exports.getTaskById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE id=?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        reject({error: 'Id not found.'});
      } else {
        const task = { id : row.id, description: row.description, important: row.important, deadline : row.deadline, private: row.private, checked: row.checked, userid: row.userid  };
        resolve(task);
      }
    });
  });
};

// add a new task
exports.createTask = (task) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO tasks(description, important, deadline, private, checked, userid) VALUES(?, ?, DATETIME(?), ?, 0, ?)';
    //TODO fare controlli dei booleani
    db.run(sql, [task.description, task.important, task.deadline, task.private, task.userid], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// update an existing task
exports.updateTask = (task) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE tasks SET description=?, important=?, deadline=DATETIME(?), private=?, userid=? WHERE id = ?';
    db.run(sql, [task.description, task.important, task.deadline, task.private, task.userid, task.id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// mark an existing task as completed/uncompleted
exports.updateChecked = (id, checked) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE tasks SET checked=? WHERE id = ?';
    db.run(sql, [checked, id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// delete an existing task
exports.deleteTask = (task_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, [task_id], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}