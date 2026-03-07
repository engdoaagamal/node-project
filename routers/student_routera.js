const student=require("../controllers/Student_controller")
const routers=require("express").Router();
routers.post ("/addStudent",student.Create_Student);
routers.get ("/getAllstudent",student.gat_All_Student);
routers.get("/getonestudent/:id", student.gat_one_Student);
routers.post("/loginstudent", student.login_student);

module.exports=routers;