const student=require("../controllers/Student_controller")
const routers=require("express").Router();
const { verifyadmin,verifyTokenAndAuthorization}=require("../middelware/verifytocken")
const uploadfileimage=require("../middelware/uploadimage")

routers.post ("/registerStudent",uploadfileimage,student.Create_Student);

routers.get ("/getAllstudent",verifyadmin,student.gat_All_Student);

routers.get("/getonestudent/:id",verifyadmin, student.gat_one_Student);

routers.post("/loginstudent", student.login_student);

routers.put("/updatestudent/:id",verifyTokenAndAuthorization,student.update_student)
routers.delete("/deletestudent/:id",verifyadmin,student.delete_student)

routers.post("/std/forgotpassword", student.forgotPassword);
routers.post("/std/resetpassword/:token", student.resetpwd);
// upload image ok
// resert password ok
//
module.exports=routers;
//http://localhost:5000/api/updatestudent/69ac264b5f00022675a2a5bb
/*
example for rout shape for fine one update and delete 
*/

