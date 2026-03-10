const student=require("../controllers/Student_controller")
const routers=require("express").Router();
const { verifyTocken}=require("../middelware/verifytocken")
routers.post ("/registerStudent",student.Create_Student);
routers.get ("/getAllstudent",student.gat_All_Student);
routers.get("/getonestudent/:id", student.gat_one_Student);
routers.post("/loginstudent", student.login_student);
routers.put("/updatestudent/:id",verifyTocken,student.update_student)
routers.delete("/deletestudent/:id",verifyTocken,student.delete_student)
module.exports=routers;
//http://localhost:5000/api/updatestudent/69ac264b5f00022675a2a5bb
/*
example for rout shape for fine one update and delete 
*/