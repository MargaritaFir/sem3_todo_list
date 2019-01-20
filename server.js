const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require("morgan");
const path = require('path');

const router = require('./routers/tasks')


const port = process.env.PORT || 5001;

let app = express();

const dbURL = 'mongodb://margo:margo123@ds161074.mlab.com:61074/todolist';

// connects our back end code with the database
mongoose.connect(
    dbURL, 
    { useNewUrlParser: true }
    );

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));



app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .engine('html', require('ejs').renderFile)
    .use(express.static(path.join(__dirname, './client/build')))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(logger("dev"))
    .use('/api', router)
    .use('*', r => {
    r.res.sendFile(path.join(__dirname+'/client/build/index.html'));
})
    .listen(port, ()=>{
    console.log('Server started on port ' + port);
})