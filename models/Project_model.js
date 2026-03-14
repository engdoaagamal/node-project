
const Task = require("./Task_model.js")

const mongoose = require("mongoose");
const Project_Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,

    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId
        , ref: "Instructor",
        required: true
    }
    ,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: "Task"
    }]
    ,
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
        default: "Not Started"
    }
    ,
    approvalStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true })
const Project = mongoose.model("Project", Project_Schema)
module.exports = Project;