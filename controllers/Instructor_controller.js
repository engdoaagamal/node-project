const instructor = require("../models/instructor_modules")// to access the model 
const jwt = require("jsonwebtoken")// create token 
const bcrypt = require("bcrypt")// encrebt pwd 
const joi = require("joi");//for validation 

const login_instructor = async (req, res) => {

    try {
        const { email, password } = req.body;
        const logininstructor = await instructor.findOne({ email }).select("name email password specialization");
        if (!logininstructor) return res.status(404).json({
            msg: "no  instructor with this data  exist  invalid ligon",
        })
        const match = await bcrypt.compare(password, logininstructor.password)
        if (!match)
            return res.status(400).json({ message: "invalid password" })
        const tocken = jwt.sign({
            id: logininstructor._id,
            email: logininstructor.email,
            specialization: logininstructor.specialization,
            name: logininstructor.name
        },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        )
        res.status(200).json({
                    msg: "instructor login successfully",
                    data: logininstructor,
                    token: jwt.decode(tocken)
                })
    } catch (error) {
    res.status(500).json({
            msg: "error in the login instructor ",
            error:error.message
        })
    }
}
const register_instructor = async (req, res) => {
    try {
        const schema = joi.object({
            name: joi.string().trim().required().min(10).max(50),
            email: joi.string().trim().email().required(),
            specialization: joi.string().trim().required(),
            password:joi.string().trim().required().min(6).max(8),

        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({
            message: error.details[0].message
        })
        const { name, email, specialization, password } = value;

        if (await instructor.findOne({ email }))
            return res.status(401).json({ msg: "the email/ user is exist " })
        const newpwd = await bcrypt.hash(password, 10)
        const newinstructor = await instructor.create({
            name, email, specialization, password: newpwd
        })
        res.status(201).json({
            msg: "createing instructor successfully",
            data: newinstructor
        })
    } catch (error) {
        res.status(500).json({
            msg: "error in the creation instructor ",
            error:error.message
        })
    }

}
const get_one_instructor = async (req, res) => {
    try {
        const oneinstructor = await instructor.findById(req.params.id).select("name email specialization")
        if (!oneinstructor)
            return res.status(404).json({
                msg: "no  instructor with this id  exist",
            })
        res.status(200).json({
            msg: "instructors fetched successfully",
            data: oneinstructor
        })
    } catch (error) {
        res.status(500).json({
            msg: "error in the server  ....instructor ",
            error: error.message
        })
    }

}
const get_all_instructor = async (req, res) => {
    try {
        const allinstructor = await instructor.find().select("name email specialization")
        if (allinstructor.length === 0)
            return res.status(404).json({ msg: "no instructor added " })
        res.status(200).json({
            msg: "all instructor data",
            data: allinstructor
        })
    } catch (error) {
        res.status(500).json({
            msg: "error in the server  ....instructor ",
            error: error.message
        })
    }

}
const update_instructor = async (req, res) => {

}
const delete_instructor = async (req, res) => {

}
module.exports = {
    login_instructor,
    register_instructor,
    get_one_instructor,
    get_all_instructor,
    update_instructor,
    delete_instructor,
}