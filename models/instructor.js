const mongoose = require("mongoose")
Instructor_schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,

    }
    , email: {
        type: String,
        require: true,
        trim: true
    }
    , specialization: {
        type: String,
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


}, { timestamps: true })
const Instructor = mongoose.model("Instructor", Instructor_schema);
module.exports = Instructor;


