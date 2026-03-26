const joi = require("joi")
const createTaskSchema = joi.object({
    title: joi.string().trim().required()
    ,
    description: joi.string().required(),

    deadline: joi.date().required(),

    status: joi.valid("Pending", "Done").default("Pending"),
    Project_id: joi.string().required(),

    Student_id: joi.string().required()
}

)

const updateTaskSchema = joi.object({
    title: joi.string().trim(),
    description: joi.string(),
    deadline: joi.date(),
    status: joi.string().valid("Pending", "Done"),
    Project_id: joi.string(),
    Student_id: joi.string()
  });
module.exports = {
    createTaskSchema,
    updateTaskSchema
}