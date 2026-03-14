const Task=require("../controllers/Task_controller");

const routers=require("express").Router();
//const { verifyTocken}=require("../middelware/verifytocken")
routers.post ("/createtask",Task.createTask);//1
routers.get ("/getAllTasks",Task.getAllTasks);//1
routers.get("/getoneTaskbyid/:id", Task.getoneTaskbyid);//1

routers.get ("/getTaskstatus/:id",Task.get_status_Taskbyid);//1
routers.get("/getallbyprojectid/:id", Task.getall_by_project_id);//1
routers.get("/getallbystdid/:id", Task.getall_by_std_id);


routers.put("/updatetask/:id",Task.updateTask)//1
routers.delete("/deletetask/:id",Task.deleteTaskbyid)//1


module.exports=routers