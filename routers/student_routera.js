const student=require("../controllers/Student_controller")
const routers=require("express").Router();
const { verifyadmin,verifyTokenAndAuthorization,verifyTocken}=require("../middelware/verifytocken")
const uploadfileimage=require("../middelware/uploadimage")

routers.post ("/registerStudent",uploadfileimage,student.Create_Student);
routers.post("/loginstudent", student.login_student);


routers.get ("/getAllstudent",verifyTocken,student.gat_All_Student);

routers.get("/getonestudent/:id",verifyTocken, student.gat_one_Student);
/*routers.get("/me", verifyTocken, verifystudent, student.getMyProfile);

routers.put("/updatestudent/:id", verifyTocken, verifyTokenAndAuthorization, student.update_student);

routers.get("/getonestudent/:id", verifyTocken, verifyTokenAndAuthorization, student.gat_one_Student);*/


routers.put("/updatestudent/:id",verifyTokenAndAuthorization,student.update_student)
routers.delete("/deletestudent/:id",verifyadmin,student.delete_student)

routers.post("/std/forgotpassword", student.forgotPassword);
routers.post("/std/resetpassword/:token", student.resetpwd);

module.exports=routers;
//http://localhost:5000/api/updatestudent/69ac264b5f00022675a2a5bb


