const { model } = require("mongoose");
const jwt = require("jsonwebtoken")

const student = require("../models/Student_module");
const bcrypt = require("bcrypt");
const joi = require("joi");

const async_handler = require("express-async-handler");
// register student 

const Create_Student = async (req, res) => {
  try {
    const schema = joi.object({
      name: joi.string().trim().required().max(50).min(10),
      email: joi.string().trim().email().required(),
      universityId: joi.number().required(),
      password: joi.string().trim().min(6).max(8).required(),
      department: joi.string().trim().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, universityId, department } = value;

    if (await student.findOne({ email }))
      return res.status(400).json({ msg: "Email already exists" });

    const newpwd = await bcrypt.hash(password, 10);

    const newstudent = await student.create({
      name, email, password: newpwd, universityId, department
    });

    const { password: pwd, ...studentData } = newstudent._doc;

    res.status(200).json({
      msg: "creating student success",
      data: studentData
    });

  } catch (error) {
    res.status(500).json({
      msg: "error in the creation student",
      error: error.message
    });
  }
}
// const Create_Student = async (req, res) => {
// try{
//       const Schema = joi.object({
//         name: joi.string().trim().required().max(50).min(10),
//         email: joi.string().trim().email().required(),
//         universityId: joi.number().required(),
//         password: joi.string().trim().min(6).max(8).required(),
//         department: joi.string().trim().required(),
//     })
//     const { error, value } = Schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({
//             message: error.details[0].message
//         });

//     }
//     // console.log(value);
//     const { name, email, password, universityId, department } = value;
//     const newpwd = await bcrypt.hash(password, 10);
//     const newstudent = await student.create({
//         name, email, password: newpwd, universityId, department
//     });
//     res.status(200).json({
//         msg: "creating student success",
//         data: newstudent
//     })

// }
  
//     // try {
//     // //   return res.status(200).json({
//     // //     msg:"welcome to student  create student func"
//     // //    })
//     //     const {name,email,password ,universityId, department}=req.body;
//     //     if(!name||!email ||!password ||!universityId||! department)res.status(404).json({
//     //         msg:"please enter all data ",

//     //     })
//     //     const oldstudent=await Student.findone({universityId});
//     //     if(oldstudent)res.status(404).json({
//     //         msg:"please enter all data ",

//     //     })
//     //     else{
//     //         const newpwd=await bycrbt.hash(req.body.password,10);
//     //         const newstudent=await student.create({
//     //            name,email,password:newpwd ,universityId, department
//     //         }) ;
//     //         res.status(200).json({
//     //             msg:"creating student success",
//     //             data:newstudent
//     //         })
//     //         newstudent.password=newpwd;
//     //     }
//     // }
//      catch (error) {
//         res.status(500).json({
//             msg:"error in the creation student ",
//             error
//         })
//     }
// }

// all student 
const gat_All_Student = async (req, res) => {
    try {

        const Allstudent = await student.find();
        // return console.log(Allstudent)
        if (Allstudent.length === 0) return res.status(404).json({
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

        const onestudent = await student.findById(req.params.id).select("name email   universityId  department ");

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
const login_student = async (req, res) => {

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
            email: loginstudent.email,
            universityId: loginstudent.universityId,
            name: loginstudent.name
        },
            process.env.JWT_SECRET,
            { expiresIn: "5h" })
        //return console.log("the token created :",token)
        res.status(200).json({
            msg: "students login successfully",
            data: loginstudent,
            token: jwt.decode(token)
        })


    } catch (error) {
        res.status(500).json({
            msg: "error in the server  ....student ",
            error: error.message
        })
    }

}

const update_student = async (req, res) => {

}
const delete_instructor = async (req, res) => {

}
module.exports = {
    Create_Student,
    gat_All_Student,
    gat_one_Student,
    login_student,
    update_student,
    delete_instructor,
}