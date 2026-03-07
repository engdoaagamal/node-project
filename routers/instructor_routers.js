const instructor =require("../controllers/Instructor_controller")
const routers=require("express").Router();


routers.get("/getoneinstructor/:id",instructor.get_one_instructor)
routers.get("/getallinstructor",instructor.get_all_instructor)
routers.post("/logininstructor",instructor.login_instructor)
routers.post("/registerinstructor",instructor.register_instructor)

 routers.post("/updateinstructor",instructor.update_instructor)
routers.post("/deleteinstructor/:id",instructor.delete_instructor)


module.exports = routers;