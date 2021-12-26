const { json } = require('express/lib/response');
const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustoError } = require('../errors/custom-error');

const getAlltasks = asyncWrapper(async(req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks });
})
const createTask = asyncWrapper(async(req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});
const getTask = asyncWrapper(async(req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustoError(`no task with that id: ${taskID}`, 404))
    }
    res.status(200).json({ task });
})
const deleteTask = asyncWrapper(async(req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustoError(`no task with that id: ${taskID}`, 404))
    }
    res.status(200).json({ task });
});
const updateTask = asyncWrapper(async(req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustoError(`no task with that id: ${taskID}`, 404))
    }
    res.status(200).json({ task });
})
module.exports = { getAlltasks, createTask, getTask, updateTask, deleteTask }