const Project = require("./Project_model.js")
const student = requir("./Student_module.js")

const mongoose = require("mongoose")
const Task_Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,

    },
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
    enum: ["Pending", "Done"],
    default: "Pending"
    },
    Project_id: {
        type: mongoose.Schema.Types.ObjectId
        , ref: "Project",
        required: true
    },
    Student_id: {
        type: mongoose.Schema.Types.ObjectId
        , ref: "Student"
    }
}, { timestamps: true })
const Task = mongoose.model("Task", Task_Schema)
module.exports = Task;