const mongoose = require("mongoose")
Student_schema = new mongoose.Schema({
    name: {
        type: string,
        require: true,

    }
    , email: {
        type: string,
        require: true,
        trim: true
    }
    , universityId: {
        type: Number,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        trime: true,
        minlength: 6,
        maxlength:8,
    }

    , department: {
        type: string,
        require: true,
    }
}, { timestamps: true })
const Student = mongoose.model("Student", Student_schema);
module.exports = Student;


