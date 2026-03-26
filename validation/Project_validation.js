const joi=require("joi")
// const createProjectSchema=joi.object({
// title:joi.string().trim().required(),
// description:joi.string().trim().required(),
// status:joi.string().valid("Not Started", "In Progress", "Completed"),
// approvalStatus:joi.string().valid("Pending", "Approved", "Rejected"),
// supervisor:joi.string().required(),

// })
const createProjectSchema = joi.object({
  title: joi.string().trim().required(),
  description: joi.string().trim().required(),

  status: joi.string().valid("Not Started", "In Progress", "Completed"),
  approvalStatus: joi.string().valid("Pending", "Approved", "Rejected"),

  supervisor: joi.string().required(),

  // ✅ add this
  students: joi.array().items(joi.string()),

  // ✅ add this
  tasks: joi.array().items(
      joi.object({
          title: joi.string().required(),
          description: joi.string().required(),
          deadline: joi.date().required(),
          status: joi.string().valid("Pending", "Done"),
          student: joi.string().required()
      })
  )
});
// const updateProjectSchema=joi.object({
// title:joi.string().trim(),
// description:joi.string().trim(),
// status:joi.string().valid("Not Started", "In Progress", "Completed"),
// approvalStatus:joi.string().valid("Pending", "Approved", "Rejected"),
// supervisor:joi.string(),
// })
const updateProjectSchema = joi.object({
  title: joi.string().trim(),
  description: joi.string().trim(),

  approvalStatus: joi.string().valid("Pending", "Approved", "Rejected"),

  supervisor: joi.string(),

  students: joi.array().items(joi.string()),

  tasks: joi.array().items(
    joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      deadline: joi.date().required(),
      status: joi.string().valid("Pending", "Done"),
      Student_id: joi.string().required()   // ✅ بدل student
    })
  )
});
module.exports={
    createProjectSchema,
    updateProjectSchema
}

/*
 await Project.findByIdAndUpdate(projectId, {
   $push: { tasks: task._id }
})

This keeps the relationship between Project → Tasks.
    
        */