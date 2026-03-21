const Project=require("../controllers/Project_controller");
const routers=require("express").Router();
const { verifyTocken,verifyadmin}=require("../middelware/verifytocken")

routers.post ("/createProject",verifyadmin,Project.createProject);
routers.get ("/getAllProjects",verifyadmin,Project.getAllProjects);
routers.get("/getoneProjectbyid/:id",verifyTocken, Project.getoneProjectbyid);

routers.get ("/getstatusProjectbyid/:id",verifyTocken,Project.get_statusProjectbyid);
routers.get("/getallbyinstructorid/:id",verifyadmin, Project.getall_by_instructor_id);

routers.get("/getallbystdid/:id", Project.getall_by_std_id);//not test 
routers.get("/getonebytaskid/:id", Project.get_one_by_task_id);// not test

routers.put("/updateProject/:id",verifyadmin,Project.updateProject)
routers.delete("/deleteProject/:id",verifyadmin,Project.deleteProjectbyid)


module.exports=routers
