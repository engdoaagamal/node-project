const instructor =require("../controllers/Instructor_controller")
const routers=require("express").Router();
const {verifyTokenAndAuthorization,verifyadmin}=require("../middelware/verifytocken")


routers.get("/getoneinstructor/:id",instructor.get_one_instructor)
routers.get("/getallinstructor",instructor.get_all_instructor)
routers.post("/logininstructor",instructor.login_instructor)
routers.post("/registerinstructor",instructor.register_instructor)

 routers.put("/updateinstructor/:id",verifyTokenAndAuthorization,instructor.update_instructor)
routers.delete("/deleteinstructor/:id",verifyadmin,instructor.delete_instructor)


module.exports = routers;