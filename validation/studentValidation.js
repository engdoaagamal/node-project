const joi = require("joi");
  const createStudentSchema = joi.object({
      name: joi.string().trim().required().max(50).min(10),
      email: joi.string().trim().email().required(),
      universityId: joi.number().required(),
      password: joi.string().trim().min(6).max(8).required(),
      department: joi.string().trim().required(),
    });

     const updateStudentSchema = joi.object({
      name: joi.string().trim().max(50).min(10),
      email: joi.string().trim().email(),
      universityId: joi.number(),
      password: joi.string().trim().min(6).max(8),
      department: joi.string().trim(),
    });
    
    module.exports = {
  createStudentSchema,
  updateStudentSchema
};