const { required } = require("joi");
const mongoose = require("mongoose")
Student_schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,

    }
    , email: {
        type: String,
        required: true,
        trim: true
    }
    , universityId: {
        type: Number,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
     
    },
    resetToken: String,
    resetTokenExpire: Date,

    department: {
        type: String,
        required: true,
    },
    profileimage:{
        type:String ,
        required:true
    }
}, { timestamps: true })
const Student = mongoose.model("Student", Student_schema);
module.exports = Student;


