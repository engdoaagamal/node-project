

//getall_by_project_id  
//getall_by_std_id  
//get_one_byP_id  
//get_one_byS_id


const Task = require("../models/Task_model")
const project = require("../models/Project_model")
const async_handler = require("express-async-handler")
const { createTaskSchema, updateTaskSchema } = require("../validation/Task_validation")
const mongoose = require("mongoose")
// create
// const createTask = async_handler(async (req, res) => {

//     const { value, error } = createTaskSchema.validate(req.body);
//     if (error)
//         return res.status(400).json({
//             message: error.details[0].message
//         })

//     const { title, description,deadline, status,Project_id, Student_id } = value;
//     const newTask = await Task.create({  title, description,deadline, status,Project_id, Student_id })
//     if (newTask)
//     //const project task =await project.findone({_id:project_id}).tasks.push(newtask)
//         return res.status(201).json({
//             msg: "Task created successfully",
//             data: newTask
//         })
// }

// )

const createTask = async_handler(async (req, res) => {

    const { value, error } = createTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const { title, description, deadline, status, Project_id, Student_id } = value;

    const newTask = await Task.create({
        title,
        description,
        deadline,
        status,
        Project_id,
        Student_id
    });

    //  update project مباشرة
    await project.findByIdAndUpdate(
        Project_id,
        { $push: { tasks: newTask._id } }
    );

    res.status(201).json({
        msg: "Task created successfully",
        data: newTask
    });
});
//get_all
const getAllTasks = async_handler(async (req, res) => {
    const AllTasks = await Task.find().populate("Student_id", "name")
    .populate("Project_id", "title")
    if (AllTasks.length === 0)
        return res.status(200).json({
            msg: "no  data exist",

        })

    return res.status(200).json({ 
        msg: "getting Tasks success", 
        data: AllTasks })
}

)
//get_one_byid
const getoneTaskbyid = async_handler(async (req, res) => {
    const theTask = await Task.findById(req.params.id)
    if (!theTask)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "getting the Task success",
        data: theTask
    })
}

)
// get status
const get_status_Taskbyid = async_handler(async (req, res) => {
    const theTask = await Task.findById(req.params.id).select("status")
    if (!theTask)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "getting the Task success",
        data: theTask
    })
}

)

// update
const updateTask = async_handler(async (req, res) => {

    const { value, error } = updateTaskSchema.validate(req.body);
    if (error)
        return res.status(400).json({
            message: error.details[0].message
        })

    const {title, description,deadline, status,Project_id, Student_id} = value;
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
         { $set: 
            {title, description,deadline, status,Project_id, Student_id} 
        },
         { new: true })
    if (updatedTask)
        return res.status(200).json({
            msg: "updating Task success",
            data: updatedTask
        })
}

)
//delete
const deleteTaskbyid = async_handler(async (req, res) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if (!deletedTask)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "deleting  the Task success",
        data: deletedTask
    })
}

)


//getall_by_project_id
const getall_by_project_id = async_handler(async (req, res) => {
    const theTasks = await Task.find({Project_id:req.params.id})
    if (theTasks.length===0)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "getting the Task success",
        data: theTasks
    })
}

)


//getall_by_std_id
const getall_by_std_id = async_handler(async (req, res) => {
  // console.log("in router ")
    // const theTasks = await Task.find({Student_id: mongoose.Types.ObjectId(req.params.id)})
    //  if (theTasks.length===0)
    //     return res.status(400).json({
    //         msg: "no  data exist here ",
 
    //     })
    // return res.status(200).json({
    //     msg: "getting the Tasks success",
    //     data: theTasks
    // })
}

)

// const getall_by_std_id = async_handler(async (req, res) => {
//     let studentId;
//     try {
//         studentId = mongoose.Types.ObjectId(req.params.id); // تحويل string لـ ObjectId
//     } catch(err) {
//         return res.status(400).json({ msg: "invalid student id" });
//     }

//     const theTasks = await Task.find({ Student_id: studentId });

//     if (!theTasks || theTasks.length === 0)
//         return res.status(404).json({ msg: "no data exist for this student" });

//     res.status(200).json({
//         msg: "getting the Tasks success",
//         count: theTasks.length,
//         data: theTasks
//     });
// });


/*------------------------------------------------------------------------------*/

module.exports={
    getall_by_std_id,
    getall_by_project_id,
    deleteTaskbyid,
    updateTask,
    get_status_Taskbyid,
    getoneTaskbyid,
    getAllTasks,
    createTask

}