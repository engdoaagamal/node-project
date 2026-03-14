const joi=require("joi")
const createProjectSchema=joi.object({
title:joi.string().trim().required(),
description:joi.string().trim().required(),
status:joi.string().valid("Not Started", "In Progress", "Completed"),
approvalStatus:joi.string().valid("Pending", "Approved", "Rejected"),
supervisor:joi.string().required(),

})

const updateProjectSchema=joi.object({
title:joi.string().trim(),
description:joi.string().trim(),
status:joi.string().valid("Not Started", "In Progress", "Completed"),
approvalStatus:joi.string().valid("Pending", "Approved", "Rejected"),
supervisor:joi.string(),
})

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