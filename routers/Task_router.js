const Task=require("../controllers/Task_controller");

const routers=require("express").Router();
const { verifyTocken,verifyadmin}=require("../middelware/verifytocken")
routers.post ("/createtask",verifyadmin,Task.createTask);//1
routers.get ("/getAllTasks",verifyadmin,Task.getAllTasks);//1
routers.get("/getoneTaskbyid/:id",verifyTocken, Task.getoneTaskbyid);//1
// frond 
routers.get ("/getTaskstatus/:id",verifyTocken,Task.get_status_Taskbyid);//1
routers.get("/getallbyprojectid/:id",verifyTocken, Task.getall_by_project_id);//1
routers.get("/getallbystdid/:id",verifyTocken, Task.getall_by_std_id);
//

routers.put("/updatetask/:id",verifyadmin,Task.updateTask)//1
routers.delete("/deletetask/:id",verifyadmin,Task.deleteTaskbyid)//1


module.exports=routers