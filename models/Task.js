const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    task : {
        type : String,
    },
    status: {
        type : Boolean,
    },
    date:{
        type: Date,
        default : Date.now
    }
})

module.exports = Task = mongoose.model('task',TaskSchema)