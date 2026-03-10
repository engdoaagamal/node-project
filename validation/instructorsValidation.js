const joi = require("joi");//for validation 
 const createInstructorSchema  = joi.object({
            name: joi.string().trim().required().min(10).max(50),
            email: joi.string().trim().email().required(),
            specialization: joi.string().trim().required(),
            password:joi.string().trim().required().min(6).max(8),

        })
module.exports = {
  createInstructorSchema
};