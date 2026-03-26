const project = require("../models/Project_model")
const async_handler = require("express-async-handler")
const { createProjectSchema, updateProjectSchema } = require("../validation/Project_validation")
const mongoose = require("mongoose")
// create
// const createProject = async_handler(async (req, res) => {

//     const { value, error } = createProjectSchema.validate(req.body);
//     if (error)
//         return res.status(400).json({
//             message: error.details[0].message
//         })

//     const { title, description, status, approvalStatus, supervisor } = value;
//     const newproject = await project.create({ title, description, status, approvalStatus, supervisor })
//     if (newproject)
//         return res.status(201).json({
//             msg: "Project created successfully",
//             data: newproject
//         })
// }

// )
//new version
const Task = require("../models/Task_model");

const createProject = async_handler(async (req, res) => {

    const { title, description, supervisor, students, tasks } = req.body;

    // 1️⃣ create project الأول
    const newProject = await project.create({
        title,
        description,
        supervisor,
        students // array of ids
    });

    // 2️⃣ create tasks وربطها بالـ project
    if (tasks && tasks.length > 0) {
        const createdTasks = await Promise.all(
            tasks.map(task => {
                return Task.create({
                    title: task.title,
                    description: task.description,
                    deadline: task.deadline,
                    status: task.status,
                    Project_id: newProject._id,
                    Student_id: task.student // 👈 واحد بس
                });
            })
        );

        // 3️⃣ خزني الـ task ids في المشروع
        newProject.tasks = createdTasks.map(t => t._id);
        await newProject.save();
    }

    res.status(201).json({
        msg: "Project created successfully",
        data: newProject
    });

});

//get_all
const getAllProjects = async_handler(async (req, res) => {
    const AllProjects = await project.find().populate("supervisor", "name")
    .populate("students", "name")
    .populate("tasks");


    if (AllProjects.length === 0)
        return res.status(200).json({
            msg: "no  data exist",

        })

    return res.status(200).json({ 
        msg: "getting projects success", 
        data: AllProjects })
}

)
//get_one_byid
const getoneProjectbyid = async_handler(async (req, res) => {
    const theProject = await project.findById(req.params.id).populate("supervisor", "name")
    .populate("students", "name")
    .populate("tasks");
    if (!theProject)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "getting the project success",
        data: theProject
    })
}

)
// get status
const get_statusProjectbyid = async_handler(async (req, res) => {
    const theProject = await project.findById(req.params.id).select("status")
    if (!theProject)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "getting the project success",
        data: theProject
    })
}

)

// update
// const updateProject = async_handler(async (req, res) => {

//     const { value, error } = updateProjectSchema.validate(req.body);
//     if (error)
//         return res.status(400).json({
//             message: error.details[0].message
//         })

//     const { title, description, status, approvalStatus, supervisor } = value;
//     const updatedproject = await project.findByIdAndUpdate(
//         req.params.id,
//          { $set: 
//             { title, description, status, approvalStatus, supervisor } 
//         },
//          { new: true })
//     if (updatedproject)
//         return res.status(200).json({
//             msg: "updating project success",
//             data: updatedproject
//         })
// }

// )

//new
const updateProject = async_handler(async (req, res) => {
    const { value, error } = updateProjectSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const {
        title,
        description,
        approvalStatus,
        supervisor,
        students,
        tasks
    } = value;

    // 🔥 1. update project basic data
    const existingProject = await project.findById(req.params.id);

    if (!existingProject) {
        return res.status(404).json({ msg: "Project not found" });
    }

    if (title) existingProject.title = title;
    if (description) existingProject.description = description;
    if (approvalStatus) existingProject.approvalStatus = approvalStatus;
    if (supervisor) existingProject.supervisor = supervisor;
    if (students) existingProject.students = students;

    // 🔥 2. handle tasks
    if (tasks) {

        // ❌ delete old tasks
        await Task.deleteMany({ Project_id: existingProject._id });

        // ✅ create new tasks
        const createdTasks = await Promise.all(
            tasks.map(t => {
                return Task.create({
                    title: t.title,
                    description: t.description,
                    deadline: t.deadline,
                    status: t.status,
                    Project_id: existingProject._id,
                    Student_id: t.Student_id
                });
            })
        );

        // ✅ save task ids
        existingProject.tasks = createdTasks.map(t => t._id);
    }

    await existingProject.save();

    res.status(200).json({
        msg: "Project updated successfully ✅",
        data: existingProject
    });
});
//delete
const deleteProjectbyid = async_handler(async (req, res) => {
    const deletedProject = await project.findByIdAndDelete(req.params.id)
    if (!deletedProject)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "deleting  the project success",
        data: deletedProject
    })
}

)


//getall_by_instructor_id
const getall_by_instructor_id = async_handler(async (req, res) => {
    const theProjects = await project.find({supervisor:req.params.id})
    if (theProjects.length===0)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "getting the project success",
        data: theProjects
    })
}

)


//getall_by_std_id
const getall_by_std_id = async_handler(async (req, res) => {
    const theProjects = await project.find({students:req.params.id})
     if (theProjects.length===0)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "getting the project success",
        data: theProjects
    })
}

)

//get_one_by_task_id  
const get_one_by_task_id = async_handler(async (req, res) => {
    const theProjects = await project.findOne({tasks:req.params.id})
     if (theProjects.length===0)
        return res.status(404).json({
            msg: "no  data exist",

        })
    return res.status(200).json({
        msg: "getting the project success",
        data: theProjects
    })
}

)
module.exports={
    get_one_by_task_id,
    getall_by_std_id,
    getall_by_instructor_id,
    deleteProjectbyid,
    updateProject,
    get_statusProjectbyid,
    getoneProjectbyid,
    getAllProjects,
    createProject

}