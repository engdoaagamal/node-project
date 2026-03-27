const { model } = require("mongoose");
const jwt = require("jsonwebtoken")

const student = require("../models/Student_module");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const joi = require("joi");

const { verifyTocken}=require("../middelware/verifytocken")
const { createStudentSchema, updateStudentSchema } = require("../validation/studentValidation");

const async_handler = require("express-async-handler");
// register student 

const Create_Student =async_handler(
    async (req, res) => { 
       // return console.log(req.file);
        const { error, value } = createStudentSchema.validate(req.body);
        // return res.json({msg:req.body})
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { name, email, password, universityId, department } = value;

        if (await student.findOne({ email }))
            return res.status(400).json({ msg: "Email already exists" });
if(!req.file)return res.status(400).json({msg:"the profile image is required"})
        const newpwd = await bcrypt.hash(password, 10);

        const newstudent = await student.create({
            name, email, password: newpwd, universityId, department ,profileimage:req.file.path
        });

        const { password: pwd, ...studentData } = newstudent._doc;

        res.status(201).json({
            msg: "creating student success",
            data: studentData
        });

    
}
) 
// all student 
const gat_All_Student = async (req, res) => {
    try {

        const Allstudent = await student.find();
        // return console.log(Allstudent)
        if (Allstudent.length === 0) return res.status(400).json({
            msg: "no  data exist",

        })


        res.status(200).json({
            msg: "students fetched successfully",
            data: Allstudent
        })


    } catch (error) {
        res.status(500).json({
            msg: "error in the server  ....student ",
            error: error.message
        })
    }

}

// one student by id 
const gat_one_Student = async (req, res) => {

    try {

        const onestudent = await student.findById(req.params.id).select("name email   universityId  department profileimage ");

        if (!onestudent) return res.status(404).json({
            msg: "no  student with this id  exist",

        })


        res.status(200).json({
            msg: "students fetched successfully",
            data: onestudent
        })


    } catch (error) {
        res.status(500).json({
            msg: "error in the server  ....student ",
            error: error.message
        })
    }

}


// login and create token 
const login_student =  async (req, res) => {

    try {
        const { email, password } = req.body;
        const loginstudent = await student.findOne({ email }).select("name email password  universityId  department ");

        if (!loginstudent) return res.status(404).json({
            msg: "no  student with this data  exist  invalid ligon",

        })

        const match = await bcrypt.compare(password, loginstudent.password)
        if (!match)
            return res.status(401).json({ message: "invalid password" })
        const token = jwt.sign({
            id: loginstudent._id,
              // for test
            // email: loginstudent.email,
            // universityId: loginstudent.universityId,
            // name: loginstudent.name,
            role:"student"
        },
            process.env.JWT_SECRET,
            { expiresIn: "5h" })
        //return console.log("the token created :",token)//jwt.decode(token)
        res.status(200).json({
            msg: "students login successfully",
            //   data: jwt.verify(token, process.env.JWT_SECRET),
            token
        })


    } catch (error) {
        res.status(500).json({
            msg: "error in the server  ....student ",
            error: error.message
        })
    }

}


const forgotPassword = async_handler(async (req, res) => {
    const user = await student.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

   
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
    );

    
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const link = `http://localhost:5000/api/std/resetpassword/${token}`;

    console.log("Reset Link:", link);

    res.json({ msg: "Reset link sent",link :link });
});


const resetpwd = async_handler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(400).json({ msg: "Invalid or expired token" });
    }

   
    const user = await student.findOne({
        _id: decoded.id,
        resetToken: token,
        resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ msg: "Token not valid" });
    }

    
    const newPassword = await bcrypt.hash(password, 10);

    user.password = newPassword;

   
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ msg: "Password reset successful " });
});

const update_student = async_handler(
     async (req, res) => {
   if(req.user.id!==req.params.id){
    return res.status(403).json({ message:"You are not allowed to access this account"})
   }
        const { error } = updateStudentSchema.validate(req.body);
        if (error)
            return res.status(400).json({
                message: error.details[0].message
            })
        const updatesdstudent = await student.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                department: req.body.department
                // 
                // ,profileimage:req.file.path
            }
        }, { new: true });

        if (!updatesdstudent)
            return res.status(404).json({ msg: "student not found" })

        res.status(200).json({
            msg: "updating student success",
            data: updatesdstudent
        });

    
}
)

const delete_student =async_handler(
    async (req, res) => {
    
        const  deletestudent=  await student.findByIdAndDelete(req.params.id);
        if (!deletestudent) 
      return res.status(404).json({ msg: "student not found" })
 
    
       return res.status(200).json({
            msg: "deleting student success",
            data: deletestudent
        });}
) 
    

module.exports = {
    Create_Student,
    gat_All_Student,
    gat_one_Student,
    login_student,
    update_student,
    delete_student,
    resetpwd,
    forgotPassword
}
