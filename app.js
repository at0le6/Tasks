const express = require('express');
const app = express();
const tasks = require('./routes/tasks')

app.get('/hello', (req, res) => {
    res.send('Task manager App');
});
//Middleware
app.use(express.json());
//Routes
app.use('/api/v1/tasks', tasks);

//app.get('/api/v1/tasks)        -get all tasks
//app.post('/api/v1/tasks)       -create a new tasks
//app.get('/api/v1/tasks/:id)    -get a single tasks
//app.patch('/api/v1/tasks/:id)  -update tasks
//app.patch('/api/v1/tasks/:id)  -delete tasks

const port = 3000;

app.listen(port, console.log("Server its listening in port:" + port))