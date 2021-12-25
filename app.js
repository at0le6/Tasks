const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./bd/connect');
const notFound = require('./middleware/not-found')
require('dotenv').config();
const cors = require('cors')
app.use(cors())

app.use(express.static('./public'))
    //Middleware
app.use(express.json());
app.use(notFound);
//Routes
app.use('/api/v1/tasks', tasks);

//app.get('/api/v1/tasks)        -get all tasks
//app.post('/api/v1/tasks)       -create a new tasks
//app.get('/api/v1/tasks/:id)    -get a single tasks
//app.patch('/api/v1/tasks/:id)  -update tasks
//app.patch('/api/v1/tasks/:id)  -delete tasks

const port = 3000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log("Server its listening in port:" + port))
    } catch (error) {
        console.log(error);
    }
}
start();