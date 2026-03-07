const mongoose = require("mongoose")
Instructor_schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,

    }
    , email: {
        type: String,
        require: true,
        trim: true,
         unique: true,
    }
    , specialization: {
        type: String,
        require: true,
       
    },

    password: {
        type: String,
        required: true,
        trim: true,
     
    }


}, { timestamps: true })
const Instructor = mongoose.model("Instructor", Instructor_schema);
module.exports = Instructor;


