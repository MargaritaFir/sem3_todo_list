const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    list: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

const TasksList = mongoose.model('Lists', ListSchema);
module.exports = TasksList;