const express = require('express');
const router = express.Router();


const TasksList = require('../model/ListSchema');



//All Tasks
router.get('/getData', (req, res) => {
    TasksList.find()
        .then(items => res.json(items));
});

//Add Task
router.post('/addData', (req, res) => {
    const newList = new TasksList({
        list: req.body.list,
    });
    newList.save().then(item => res.json(item));
});

//Delete Task
router.delete('/deleteData/:id', (req,res) => {
    TasksList.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success: false}));

});

//Update Task
router.put('/updateData/:id', (req,res) => {
    TasksList.findById(req.params.id)
        .then(item => {
            item.list = req.body.list;
            item.save().then(item => res.json(item));
        }).catch(err=>res.status(404).json({success:false}));

});

module.exports = router;