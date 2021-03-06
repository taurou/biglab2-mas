# BigLab 2 - Class: 2021 WA1

## Team name: MAS

Team members:
* s265157 GENOVESE SIMONA
* s265554 VARRICCHIO MARTINA 
* s281605 TAURINO ANDREA

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once cloned this repository, instead, write your names in the above section.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]


### List tasks

URL: `/api/tasks`

HTTP Method: GET

Description: Retrieve the list of all the tasks

Request body: EMPTY

Response: 

Response body:
```
[ {id, description, deadline, important, private, checked, userid}, {id, description, deadline, important, private, checked, userid} ]
```

### Get tasks

#### Get task by id

URL: `/api/tasks/id/:id`

HTTP Method: GET

Description: Retrieve the attributes of the task with the specified id

Request body: EMPTY

Response: 

Response body:
```
{id, description, deadline, important, private, checked, userid}
```

#### Get important tasks

URL: `/api/tasks/important`

HTTP Method: GET

Description: Retrieve the list of important tasks

Request body: EMPTY

Response: 

Response body:
```
[ {id, description, deadline, important, private, checked, userid}, {id, description, deadline, important, private, checked, userid} ]
```

#### Get private tasks

URL: `/api/tasks/private`

HTTP Method: GET

Description: Retrieve the list of private tasks

Request body: EMPTY

Response: 

Response body:
```
[ {id, description, deadline, important, private, checked, userid}, {id, description, deadline, important, private, checked, userid} ]
```
#### Get tasks with deadline 

##### Get tasks by deadline

URL: `/api/tasks/deadline/:deadline`

HTTP Method: GET

Description: Retrieve the list of tasks with a given deadline

Request body: EMPTY

Response: 

Response body:
```
[ {id, description, deadline, important, private, checked, userid}, {id, description, deadline, important, private, checked, userid} ]
```

##### Get today's tasks

URL: `/api/tasks/today`

HTTP Method: GET

Description: Retrieve the list of tasks with deadline corrisponding to the current day

Request body: EMPTY

Response: 

Response body:
```
[ {id, description, deadline, important, private, checked, userid}, {id, description, deadline, important, private, checked, userid} ]

```
##### Get tasks for the next 7 days

URL: `/api/tasks/nextdays`

HTTP Method: GET

Description: Retrieve the list of task with deadline between the next day and the next seven days.

Request body: EMPTY

Response: 

Response body:
```
[ {id, description, deadline, important, private, checked, userid}, {id, description, deadline, important, private, checked, userid} ]
```

### Add a new task

URL: `/api/tasks`

HTTP Method: POST

Description: Add a new task by providing all relevant information

Request body: `{description, deadline, important, private, userid}`

Response: 

Response body: EMPTY

### Update an existing task

URL: `/api/tasks/id/:id`

HTTP Method: PUT

Description: Update information of an existing task with a given id 

Request body: `{description, deadline, important, private, userid}`

Response:

Response Body: EMPTY

### Check/Uncheck a task

URL: `/api/tasks/id/:id/:checked`

HTTP Method: PUT

Description: Check/Uncheck an existing task with a given id

Request body: EMPTY

Response: 

Response body: EMPTY 


### Delete an existing task

URL: `/api/tasks/id/:id`

HTTP Method: DELETE

Description: Delete an existing task with a given id

Request body: EMPTY

Response: 

Response body: EMPTY


## Registered users in the system

### User 1

userid: 1

email: pippo@myemail.it 

password: paperino

name: Pippo

### User 2

userid: 2

email: other@mail.com 

password: thisisasecret

name: Other