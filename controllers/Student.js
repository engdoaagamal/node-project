const { model } = require("mongoose");
const student=require("../models/Student");
const Student = require("../models/Student");
const bycrbt=require("bcrypt");
const Create_Student=async(req,res)=>{
try {
  return res.status(200).json({
    msg:"welcome to student  create student func"
   })
    const {name,email,password ,universityId, department}=req.body;
    if(!name||!email ||!password ||!universityId||! department)res.status(404).json({
        msg:"please enter all data ",

    })
    const oldstudent=await Student.findone({universityId});
    if(oldstudent)res.status(404).json({
        msg:"please enter all data ",

    })
    else{
        const newpwd=await bycrbt.hash(req.body.password,10);
        const newstudent=await student.create({
           name,email,password:newpwd ,universityId, department
        }) ;
        res.status(200).json({
            msg:"creating student success",
            data:newstudent
        })
        newstudent.password=newpwd;
    }
} catch (error) {
    res.status(500).json({
        msg:"error in the creation student ",
        error
    })
}
}
const Get_Student=async(req,res)=>{
    try{
 const {email,password }=req.body;
    if(!email ||!password )res.status(404).json({
        msg:"please enter all data ",

    })
    const oldstudent=await Student.findone({email ,password});
    if(!oldstudent)res.status(404).json({
        msg:"please enter correct data ",

    })
    else{
        const newpwd=await bycrbt.hash(req.body.password,10);
        const newstudent=await student.create({
           name,email,password:newpwd ,universityId, department
        }) ;
        res.status(200).json({
            msg:"creating student success",
            data:newstudent
        })
        newstudent.password=newpwd;
    }
} catch (error) {
    res.status(500).json({
        msg:"error in the creation student ",
        error
    })
}

}
module.exports={
    Create_Student,
    Get_Student
}