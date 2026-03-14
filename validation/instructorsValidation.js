const joi = require("joi");//for validation 
const createInstructorSchema = joi.object({
  name: joi.string().trim().required().min(10).max(50),
  email: joi.string().trim().email().required(),
  specialization: joi.string().trim().required(),
  password: joi.string().trim().required().min(6).max(8),

})
const updateInstructorSchema = joi.object({
  name: joi.string().trim().min(10).max(50),
  email: joi.string().trim().email(),
  specialization: joi.string().trim(),
  password: joi.string().trim().min(6).max(8),

})
module.exports = {
  createInstructorSchema,
  updateInstructorSchema
};