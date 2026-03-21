const instructor =require("../controllers/Instructor_controller")
const routers=require("express").Router();
const {verifyTokenAndAuthorization,verifyadmin}=require("../middelware/verifytocken")
const uploadfileimage=require("../middelware/uploadimage")

routers.get("/getoneinstructor/:id",verifyadmin,instructor.get_one_instructor)
routers.get("/getallinstructor",verifyadmin,instructor.get_all_instructor)

routers.post("/logininstructor",instructor.login_instructor)
routers.post("/registerinstructor",uploadfileimage,instructor.register_instructor)

 routers.put("/updateinstructor/:id",verifyTokenAndAuthorization,instructor.update_instructor)
routers.delete("/deleteinstructor/:id",verifyadmin,instructor.delete_instructor)

routers.post("/instructor/forgotpassword", instructor.forgetpwd);
routers.post("/instructor/resetpassword/:token", instructor.resetpwd);


module.exports = routers;