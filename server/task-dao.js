'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('tasks.db', (err) => {
  if(err) throw err;
});

// get all tasks
exports.listTasks = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE userid = ? ORDER BY DATETIME(deadline)';
    db.all(sql, [userid], (err, rows) => {
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
exports.getImportantTasks = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE userid = ? AND important = 1 ORDER BY DATETIME(deadline)';
    db.all(sql, [userid], (err, rows) => {
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
exports.getPrivateTasks = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE userid = ? AND private = 1 ORDER BY DATETIME(deadline)';
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked, userid: t.userid }));
      resolve(tasks);
    });
  });
};

exports.getTaskByDeadline = (deadline, userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE deadline=? AND userid=? ORDER BY DATETIME(deadline)';
    db.all(sql, [deadline, userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked, userid: t.userid }));
      resolve(tasks);
      
    });
  });
};

exports.getNextDaysTasks = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE userid=? and DATE(deadline) > DATE("now") AND DATE(deadline) <= DATE("now","+7 days") ORDER BY DATETIME(deadline)';
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked, userid: t.userid }));
      resolve(tasks);      
    });
  });
};

exports.getTodayTasks = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE userid=? AND DATE(deadline) = DATE("now") ORDER BY DATETIME(deadline)';
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, deadline : t.deadline, private: t.private, checked: t.checked, userid: t.userid }));
      resolve(tasks); 
    });
  });
};

exports.getTaskById = (id, userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE id=? AND userid=?';
    db.get(sql, [id, userid], (err, row) => {
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
    const sql = 'UPDATE tasks SET description=?, important=?, deadline=DATETIME(?), private=? WHERE id = ? and userid=?';
    db.run(sql, [task.description, task.important, task.deadline, task.private, task.id, task.userid], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// mark an existing task as completed/uncompleted
exports.updateChecked = (id, checked, userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE tasks SET checked=? WHERE id = ? and userid=?';
    db.run(sql, [checked, id, userid], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// delete an existing task
exports.deleteTask = (task_id, userid) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tasks WHERE id = ? and userid=?';
    db.run(sql, [task_id, userid], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}